import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const source = new URL(
  "./.cache/atlas/natural-earth/world-master-80.topojson",
  import.meta.url,
);

const output = new URL(
  "./static/atlas/natural-earth/topology/",
  import.meta.url,
);

const defaults = ["ESP", "FRA", "DEU", "CZE", "POL", "EST", "FIN", "CHE"];

/** @typedef {Record<string, unknown> & {country: string}} AtlasProperties */
/** @typedef {{type: "Polygon", arcs: number[][], properties: AtlasProperties}} AtlasPolygon */
/** @typedef {{type: "MultiPolygon", arcs: number[][][], properties: AtlasProperties}} AtlasMultiPolygon */
/** @typedef {AtlasPolygon | AtlasMultiPolygon} AtlasShape */
/** @typedef {{type: "GeometryCollection", geometries: AtlasShape[]}} AtlasLayer */
/** @typedef {{type: "Topology", transform: {scale: number[], translate: number[]}, arcs: number[][][], objects: Record<string, AtlasLayer>}} AtlasTopology */

/**
 * @param {AtlasShape} shape
 * @param {Set<number>} used
 */
function collect(shape, used) {
  const rings = shape.type === "Polygon" ? shape.arcs : shape.arcs.flat();

  for (const ring of rings) {
    for (const arc of ring) {
      used.add(arc < 0 ? ~arc : arc);
    }
  }
}

/**
 * @param {number} value
 * @param {Map<number, number>} index
 * @returns {number}
 */
function remap(value, index) {
  const mapped = index.get(value < 0 ? ~value : value);

  if (mapped === undefined) {
    throw new Error("Referencia a un arco inexistente.");
  }

  return value < 0 ? ~mapped : mapped;
}

/**
 * @param {AtlasTopology} master
 * @param {Record<string, AtlasShape[]>} layers
 * @returns {AtlasTopology}
 */
function extract(master, layers) {
  /** @type {Set<number>} */
  const used = new Set();

  for (const shapes of Object.values(layers)) {
    for (const shape of shapes) {
      collect(shape, used);
    }
  }

  const ids = [...used].sort((a, b) => a - b);

  const index = new Map(ids.map((id, position) => [id, position]));

  /** @type {Record<string, AtlasLayer>} */
  const objects = {};

  for (const [name, shapes] of Object.entries(layers)) {
    objects[name] = {
      type: "GeometryCollection",
      geometries: shapes.map((shape) => {
        if (shape.type === "Polygon") {
          return {
            ...shape,
            arcs: shape.arcs.map((ring) =>
              ring.map((arc) => remap(arc, index)),
            ),
          };
        }

        return {
          ...shape,
          arcs: shape.arcs.map((polygon) =>
            polygon.map((ring) => ring.map((arc) => remap(arc, index))),
          ),
        };
      }),
    };
  }

  return {
    type: "Topology",
    transform: master.transform,
    arcs: ids.map((id) => master.arcs[id]),
    objects,
  };
}

/**
 * @param {string} filename
 * @param {AtlasTopology} topology
 */
async function save(filename, topology) {
  const content = JSON.stringify(topology);

  await writeFile(new URL(filename, output), content, "utf8");

  console.log(
    `${filename}: ` +
      `${(Buffer.byteLength(content) / 1000).toFixed(1)} KB; ` +
      `${(gzipSync(content, { level: 9 }).byteLength / 1000).toFixed(1)} KB gzip`,
  );
}

async function main() {
  const bytes = await readFile(source);

  /** @type {AtlasTopology} */
  const master = JSON.parse(bytes.toString("utf8"));

  if (
    master.type !== "Topology" ||
    !master.objects?.countries ||
    !master.objects?.regions ||
    !master.objects?.units ||
    !Array.isArray(master.arcs) ||
    !master.transform
  ) {
    throw new Error("Topología maestra no válida.");
  }

  const args = process.argv.slice(2);

  const requested = [
    ...new Set(
      (args.length ? args : defaults).map((code) => code.toUpperCase()),
    ),
  ];

  const all = master.objects.countries.geometries;

  const available = new Set(all.map((shape) => shape.properties.country));

  for (const code of requested) {
    if (!/^[A-Z]{3}$/.test(code) || !available.has(code)) {
      throw new Error(`País no disponible: ${code}`);
    }
  }

  await mkdir(output, { recursive: true });

  const sha256 = createHash("sha256").update(bytes).digest("hex");

  const marker = new URL("master.sha256", output);

  try {
    const previous = (await readFile(marker, "utf8")).trim();

    if (previous !== sha256) {
      throw new Error(
        "La topología maestra ha cambiado. Usa una carpeta de salida nueva.",
      );
    }
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      error.code !== "ENOENT"
    ) {
      throw error;
    }

    if ((await readdir(output)).length > 0) {
      throw new Error(
        "La carpeta de salida contiene datos sin identificación de origen.",
        { cause: error },
      );
    }

    await writeFile(marker, sha256 + "\n", "utf8");
  }

  await save("countries.topojson", extract(master, { countries: all }));

  if (!existsSync(new URL("countries-overview.topojson", output))) {
    execSync(
      "npx --offline --yes --package=mapshaper@0.7.100 mapshaper " +
        "static/atlas/natural-earth/topology/countries.topojson " +
        "-simplify dp 40% keep-shapes -clean " +
        "-o format=topojson quantization=10000000 " +
        "static/atlas/natural-earth/topology/countries-overview.topojson",
      {
        cwd: fileURLToPath(new URL(".", import.meta.url)),
        stdio: "inherit",
      },
    );
  }

  for (const code of requested) {
    const countries = all.filter((shape) => shape.properties.country === code);

    const regions = master.objects.regions.geometries.filter(
      (shape) => shape.properties.country === code,
    );

    const units = master.objects.units.geometries.filter(
      (shape) => shape.properties.country === code,
    );

    await save(
      `${code}.topojson`,
      extract(master, {
        countries,
        regions,
        units,
      }),
    );

    console.log(
      `${code}: ${regions.length} regiones; ${units.length} unidades`,
    );
  }

  const files = await readdir(output);

  const countries = files
    .filter((name) => /^[A-Z]{3}\.topojson$/.test(name))
    .map((name) => name.slice(0, 3))
    .sort();

  await writeFile(
    new URL("manifest.json", output),
    JSON.stringify(
      {
        source: "Natural Earth 5.1.2",
        license: "Public domain",
        sourceSHA256: sha256,
        countries,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  console.log("Extracción completada sin modificar los arcos originales.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
