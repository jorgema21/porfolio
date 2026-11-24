import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";

const version = "v5.1.2";

const source = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/${version}/geojson/ne_10m_admin_1_states_provinces.geojson`;

const directory = new URL("./.cache/atlas/natural-earth/", import.meta.url);

const cacheFile = new URL(`admin1-${version}.geojson`, directory);

const defaultCountries = [
  "ESP",
  "FRA",
  "DEU",
  "CZE",
  "POL",
  "EST",
  "FIN",
  "CHE",
];

const args = process.argv.slice(2);

const countries = [
  ...new Set(
    (args.length ? args : defaultCountries).map((code) => code.toUpperCase()),
  ),
];

if (countries.some((code) => !/^[A-Z]{3}$/.test(code))) {
  throw new Error("Utiliza códigos de país ISO de tres letras.");
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function text(value) {
  return typeof value === "string" && value !== "-99" ? value.trim() : "";
}

/**
 * @param {Buffer} bytes
 */
function parseSource(bytes) {
  /** @type {unknown} */
  const data = JSON.parse(bytes.toString("utf8"));

  if (
    !isRecord(data) ||
    data.type !== "FeatureCollection" ||
    !Array.isArray(data.features) ||
    data.features.length < 4000
  ) {
    throw new Error("Archivo Natural Earth incompleto o no válido.");
  }

  return data.features;
}

async function loadSource() {
  try {
    const bytes = await readFile(cacheFile);
    const features = parseSource(bytes);

    console.log("Reutilizando cartografía de la caché local.");

    return { bytes, features };
  } catch {
    console.log("Descargando Natural Earth 1:10m ADM1...");

    const response = await fetch(source, {
      signal: AbortSignal.timeout(300_000),
    });

    if (!response.ok) {
      throw new Error(`Error de descarga: HTTP ${response.status}`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    const features = parseSource(bytes);

    await writeFile(cacheFile, bytes);

    return { bytes, features };
  }
}

async function main() {
  await mkdir(directory, { recursive: true });

  const { bytes, features } = await loadSource();

  const sha256 = createHash("sha256").update(bytes).digest("hex");

  const report = [];

  for (const country of countries) {
    const subdivisions = features.flatMap((item) => {
      if (
        !isRecord(item) ||
        !isRecord(item.properties) ||
        !isRecord(item.geometry)
      ) {
        return [];
      }

      const properties = item.properties;
      const geometry = item.geometry;

      if (text(properties.adm0_a3) !== country) {
        return [];
      }

      if (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon") {
        return [];
      }

      return [
        {
          type: "Feature",
          properties: {
            id: text(properties.adm1_code),
            country,
            code: text(properties.iso_3166_2),
            name: text(properties.name),
            nameEs: text(properties.name_es),
            nameEn: text(properties.name_en),
            type: text(properties.type_en),
            region: text(properties.region),
            regionCode: text(properties.region_cod),
          },
          geometry,
        },
      ];
    });

    if (!subdivisions.length) {
      throw new Error(`No se encontraron divisiones para ${country}.`);
    }

    const folder = new URL(`${country}/`, directory);

    await mkdir(folder, { recursive: true });

    const collection = {
      type: "FeatureCollection",
      features: subdivisions,
    };

    const content = JSON.stringify(collection);

    await writeFile(new URL("subdivisions.geojson", folder), content, "utf8");

    await writeFile(
      new URL("catalog.json", folder),
      JSON.stringify(
        subdivisions.map((item) => item.properties),
        null,
        2,
      ),
      "utf8",
    );

    report.push({
      country,
      subdivisions: subdivisions.length,
      sizeKB: Math.round(Buffer.byteLength(content) / 1000),
      gzipKB: Math.round(gzipSync(content).byteLength / 1000),
    });

    if (country === "ESP") {
      console.log("\nDivisiones españolas:");

      console.table(
        subdivisions.map(({ properties }) => ({
          name: properties.name,
          code: properties.code,
          region: properties.region,
          regionCode: properties.regionCode,
        })),
      );
    }
  }

  await writeFile(
    new URL("source-regions.json", directory),
    JSON.stringify(
      {
        version,
        source,
        sha256,
        license: "Public domain",
        licenseUrl: "https://www.naturalearthdata.com/about/terms-of-use/",
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log("\nResumen de cartografía:");
  console.table(report);

  console.log("Extracción completada. El atlas no se ha modificado.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
