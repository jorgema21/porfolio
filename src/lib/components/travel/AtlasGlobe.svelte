<script lang="ts">
  import { onMount } from "svelte";
  import { geoOrthographic, geoPath } from "d3-geo";

  import { langSignal, t } from "#lib/i18n/index.svelte.js";

  import {
    findAtlasBoundary,
    getAtlasCountryTopology,
    getAtlasWorldTopology,
    type AtlasAreaCollection,
    type AtlasCountryTopology,
  } from "#lib/utils/travel-atlas-topology.js";

  import { getVisibleAtlasFeatures } from "#lib/utils/travel-atlas-viewport.js";

  import {
    getAtlasMarkerPoints,
    getAtlasMarkerClusters,
    getAtlasMarkerSize,
  } from "#lib/utils/travel-atlas-markers.js";

  import { createGlobePointerGestures } from "#lib/utils/travel-atlas-globe-gestures.js";
  import {
    clampLatitude,
    ATLAS_PROVINCE_ZOOM,
  } from "#lib/utils/travel-atlas-camera.js";
  import { AtlasGlobeCamera } from "#lib/utils/travel-atlas-camera-controller.svelte.js";

  import type {
    AtlasPlace,
    AtlasRelevance,
  } from "#lib/types/travel-atlas.types.js";

  import AtlasGlobeMarkers from "./AtlasGlobeMarkers.svelte";

  import { fitAtlasBoundary } from "#lib/utils/travel-atlas-fit.js";

  import type { AtlasAreaFeature } from "#lib/utils/travel-atlas-topology.js";

  interface Props {
    focus: AtlasPlace | null;
    markers: readonly AtlasPlace[];
    activeMarkerIds: ReadonlySet<string>;
    onselect: (placeId: string) => void;
    relevanceByPlace: ReadonlyMap<string, AtlasRelevance>;
    articleCountByPlace: ReadonlyMap<string, number>;
    countryCode: string | null;
    region: AtlasPlace | null;
    province: AtlasPlace | null;
  }

  let {
    focus,
    markers,
    activeMarkerIds,
    relevanceByPlace,
    articleCountByPlace,
    onselect,
    countryCode,
    region,
    province,
  }: Props = $props();

  let resetSequence = 0;

  let individualMarkerZoom = $state(ATLAS_PROVINCE_ZOOM);

  const minZoom = 1;
  const maxZoom = 64;
  const detailZoom = 2.5;

  const cameraController = new AtlasGlobeCamera(minZoom, maxZoom);
  const camera = cameraController.camera;

  const moveCamera = cameraController.moveCamera;
  const stopAutoRotation = cameraController.stopAutoRotation;
  const zoomBy = cameraController.zoomBy;
  const rotateBy = cameraController.rotateBy;

  const sphereGradientId = $props.id();

  let dragging = $state(false);
  let globeElement: HTMLDivElement | undefined = $state();

  let worldCountries = $state.raw<AtlasAreaCollection | null>(null);

  let overviewCountries = $state.raw<AtlasAreaCollection | null>(null);

  let countryData = $state.raw<{
    code: string;
    data: AtlasCountryTopology;
  } | null>(null);

  let sphereOpacity = $derived(
    Math.max(0, Math.min(1, 1 - Math.log(camera.current.zoom) / Math.log(16))),
  );

  export function resetView(
    place: AtlasPlace | null = focus,
    code: string | null = countryCode,
  ): void {
    const sequence = ++resetSequence;

    individualMarkerZoom = ATLAS_PROVINCE_ZOOM;

    cameraController.resetView(place);

    if (!place || place.type === "municipality") {
      return;
    }

    const requestedTarget = camera.target;

    void getFocusBoundary(place, code)
      .then((boundary) => {
        if (
          !boundary ||
          sequence !== resetSequence ||
          dragging ||
          camera.target !== requestedTarget
        ) {
          return;
        }

        const position = fitAtlasBoundary(boundary, place, minZoom, maxZoom);

        if (!position) return;

        if (place.type === "province") {
          individualMarkerZoom = position.zoom;
        }

        stopAutoRotation();
        cameraController.stopInertia();

        moveCamera(position);
      })
      .catch((error: unknown) => {
        if (sequence === resetSequence) {
          console.error("Error al calcular el encuadre geográfico:", error);
        }
      });
  }

  function wheelZoom(node: HTMLElement) {
    let frame: number | null = null;
    let pendingDelta = 0;

    const sensitivity = 0.0009;
    const maxDeltaPerFrame = 80;

    function applyZoom(): void {
      frame = null;

      const delta = Math.max(
        -maxDeltaPerFrame,
        Math.min(maxDeltaPerFrame, pendingDelta),
      );

      pendingDelta = 0;

      if (delta === 0) return;

      const factor = Math.exp(-delta * sensitivity);

      moveCamera(
        {
          ...camera.target,
          zoom: cameraController.clampZoom(camera.target.zoom * factor),
        },
        false,
      );
    }

    function handleWheel(event: WheelEvent): void {
      if (!event.ctrlKey || !event.cancelable) return;

      event.preventDefault();

      stopAutoRotation();
      cameraController.stopInertia();

      const delta =
        event.deltaMode === 1
          ? event.deltaY * 16
          : event.deltaMode === 2
            ? event.deltaY * 320
            : event.deltaY;

      pendingDelta += delta;

      if (frame === null) {
        frame = requestAnimationFrame(applyZoom);
      }
    }

    node.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return {
      destroy() {
        node.removeEventListener("wheel", handleWheel);

        if (frame !== null) {
          cancelAnimationFrame(frame);
        }
      },
    };
  }

  function activateMarker(
    event: PointerEvent,
    element: HTMLDivElement,
  ): boolean {
    const rect = element.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);

    if (size <= 0) return false;

    const offsetX = (rect.width - size) / 2;
    const offsetY = (rect.height - size) / 2;

    const x = ((event.clientX - rect.left - offsetX) / size) * 320;
    const y = ((event.clientY - rect.top - offsetY) / size) * 320;

    const marker = [...markerClusters]
      .filter((item) => {
        const distance = Math.hypot(item.x - x, item.y - y);

        if (item.count > 1) {
          return distance <= 14;
        }

        const markerSize = getAtlasMarkerSize(item.articleCount);

        const hitRadius =
          item.relevance === "mention"
            ? Math.max(7, markerSize * 1.3)
            : item.relevance === "detailed"
              ? Math.max(7, markerSize * Math.SQRT2)
              : Math.max(7, markerSize);

        return distance <= hitRadius;
      })
      .sort(
        (a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y),
      )[0];

    if (!marker) return false;

    if (marker.placeId !== null) {
      onselect(marker.placeId);
      return true;
    }

    const center = projection.invert?.([marker.x, marker.y]);

    if (!center) return false;

    cameraController.stopInertia();

    moveCamera({
      longitude: center[0],
      latitude: center[1],
      zoom: Math.min(
        maxZoom,
        Math.max(camera.current.zoom + 1, camera.current.zoom * 1.7),
      ),
    });

    return true;
  }

  const globePointerGestures = createGlobePointerGestures({
    camera: cameraController,

    onDraggingChange(value) {
      dragging = value;
    },

    onMarkerPress: activateMarker,
  });

  function handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
        rotateBy(-15);
        break;

      case "ArrowRight":
        rotateBy(15);
        break;

      case "ArrowUp":
        stopAutoRotation();
        moveCamera({
          ...camera.target,
          latitude: clampLatitude(camera.target.latitude + 15),
        });
        break;

      case "ArrowDown":
        stopAutoRotation();
        moveCamera({
          ...camera.target,
          latitude: clampLatitude(camera.target.latitude - 15),
        });
        break;

      case "+":
        zoomBy(1.4);
        break;

      case "-":
        zoomBy(1 / 1.4);
        break;

      case "Home":
        resetView();
        break;

      default:
        return;
    }

    event.preventDefault();
  }

  async function getFocusBoundary(
    place: AtlasPlace,
    code: string | null,
  ): Promise<AtlasAreaFeature | null> {
    if (place.type === "country") {
      const world = await getAtlasWorldTopology("full");

      return findAtlasBoundary(world, place, ["country"], ["admin", "name"]);
    }

    if (!code || place.type === "municipality") {
      return null;
    }

    const data = await getAtlasCountryTopology(code);

    if (!data) return null;

    if (place.type === "region") {
      return findAtlasBoundary(
        data.regions,
        place,
        ["regionCode"],
        ["regionName"],
      );
    }

    return findAtlasBoundary(
      data.units,
      place,
      ["code", "unitId"],
      ["name", "name_es", "name_en"],
    );
  }

  onMount(() => {
    let mounted = true;
    let started = false;
    let observer: IntersectionObserver | null = null;

    function initializeAtlas(): void {
      if (started) return;

      started = true;

      cameraController.startAutoRotation(focus === null);

      void getAtlasWorldTopology("overview")
        .then((collection) => {
          if (mounted) overviewCountries = collection;
        })
        .catch((error: unknown) => {
          if (mounted) {
            console.error("Error al cargar el mapamundi ligero:", error);
          }
        })
        .finally(() => {
          if (!mounted) return;

          void getAtlasWorldTopology("full")
            .then((collection) => {
              if (mounted) worldCountries = collection;
            })
            .catch((error: unknown) => {
              if (mounted) {
                console.error("Error al cargar el mapamundi detallado:", error);
              }
            });
        });
    }

    if (typeof IntersectionObserver === "undefined" || !globeElement) {
      initializeAtlas();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            initializeAtlas();
          }
        },
        { rootMargin: "200px 0px" },
      );

      observer.observe(globeElement);
    }

    return () => {
      mounted = false;
      resetSequence += 1;
      observer?.disconnect();
      cameraController.destroy();
    };
  });

  $effect(() => {
    const code = countryCode;

    let cancelled = false;

    countryData = null;

    if (!code) return;

    void getAtlasCountryTopology(code)
      .then((data) => {
        if (!cancelled && data) {
          countryData = { code, data };
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("Error al cargar las subdivisiones:", error);
        }
      });

    return () => {
      cancelled = true;
    };
  });

  let projection = $derived(
    geoOrthographic()
      .translate([160, 160])
      .scale(158 * camera.current.zoom)
      .rotate([-camera.current.longitude, -camera.current.latitude, 0])
      .clipAngle(90)
      .clipExtent([
        [0, 0],
        [320, 320],
      ])
      .precision(2),
  );

  let pathGenerator = $derived(geoPath(projection));

  let visibleWorld = $derived(
    camera.current.zoom < detailZoom
      ? (overviewCountries ?? worldCountries)
      : (worldCountries ?? overviewCountries),
  );

  let detailedWorldVisible = $derived(
    worldCountries !== null && visibleWorld === worldCountries,
  );

  let worldPath = $derived(
    visibleWorld
      ? pathGenerator(getVisibleAtlasFeatures(visibleWorld, projection))
      : null,
  );

  let activeCountry = $derived(
    detailedWorldVisible && countryData?.code === countryCode
      ? (countryData?.data ?? null)
      : null,
  );

  let selectedCountry = $derived(
    focus?.type === "country" || (!detailedWorldVisible && countryCode !== null)
      ? (visibleWorld?.features.find(
          (item) => item.properties.country === countryCode,
        ) ?? null)
      : null,
  );

  let selectedRegion = $derived(
    findAtlasBoundary(
      activeCountry?.regions ?? null,
      region,
      ["regionCode"],
      ["regionName"],
    ),
  );

  let selectedProvince = $derived.by(() => {
    if (!activeCountry || !selectedRegion || !province) return null;

    const code = selectedRegion.properties.regionCode;

    const units = {
      ...activeCountry.units,
      features: activeCountry.units.features.filter(
        (item) => item.properties.regionCode === code,
      ),
    };

    return findAtlasBoundary(
      units,
      province,
      ["code", "unitId"],
      ["name", "nameEs", "nameEn", "name_es", "name_en"],
    );
  });

  let highlightedCountryPath = $derived(
    selectedCountry ? pathGenerator(selectedCountry) : null,
  );

  let regionHighlightPath = $derived(
    selectedRegion ? pathGenerator(selectedRegion) : null,
  );

  let provinceHighlightPath = $derived(
    selectedProvince ? pathGenerator(selectedProvince) : null,
  );

  let regionBordersPath = $derived(
    activeCountry ? pathGenerator(activeCountry.regionBorders) : null,
  );

  let unitBordersPath = $derived.by(() => {
    const code = selectedRegion?.properties.regionCode;

    if (!activeCountry || typeof code !== "string") return null;

    const borders = activeCountry.unitBorders.get(code);

    return borders ? pathGenerator(borders) : null;
  });

  let markerPoints = $derived(
    getAtlasMarkerPoints(
      markers,
      activeMarkerIds,
      relevanceByPlace,
      articleCountByPlace,
      projection,
      [camera.current.longitude, camera.current.latitude],
    ),
  );

  let markerClusters = $derived(
    getAtlasMarkerClusters(
      markerPoints,
      camera.current.zoom,
      maxZoom,
      individualMarkerZoom,
    ),
  );

  let lang = $derived(langSignal.current);

  let accessibleLabel = $derived(
    focus
      ? `${t.travelAtlas.aria.globeCenteredPrefix} ${focus.name[lang]}`
      : t.travelAtlas.aria.globeEurope,
  );
</script>

<div class="globe-shell">
  <div
    class="globe"
    bind:this={globeElement}
    class:dragging
    use:wheelZoom
    use:globePointerGestures
  >
    <svg viewBox="0 0 320 320" role="img" aria-label={accessibleLabel}>
      <defs>
        <radialGradient id={sphereGradientId} cx="32%" cy="26%" r="82%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.26" />
          <stop offset="45%" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="70%" stop-color="#233c4b" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#233c4b" stop-opacity="0.38" />
        </radialGradient>
      </defs>

      {#if worldPath}
        <path
          d={worldPath}
          class="country"
          vector-effect="non-scaling-stroke"
        />
      {/if}

      {#if highlightedCountryPath}
        <path
          d={highlightedCountryPath}
          class="country highlighted"
          vector-effect="non-scaling-stroke"
        />
      {/if}

      {#if regionHighlightPath}
        <path
          d={regionHighlightPath}
          class="country highlighted"
          class:context={provinceHighlightPath !== null}
          vector-effect="non-scaling-stroke"
        />
      {/if}

      {#if provinceHighlightPath}
        <path
          d={provinceHighlightPath}
          class="country highlighted"
          vector-effect="non-scaling-stroke"
        />
      {/if}

      {#if unitBordersPath}
        <path
          d={unitBordersPath}
          class="unit-borders"
          vector-effect="non-scaling-stroke"
        />
      {/if}

      {#if regionBordersPath}
        <path
          d={regionBordersPath}
          class="region-borders"
          vector-effect="non-scaling-stroke"
        />
      {/if}
      <circle
        cx="160"
        cy="160"
        r="160"
        fill={`url(#${sphereGradientId})`}
        opacity={sphereOpacity}
        pointer-events="none"
        aria-hidden="true"
      />
      <AtlasGlobeMarkers
        markers={markerClusters}
        selectedPlaceId={focus?.id ?? null}
      />
    </svg>
  </div>

  <button
    type="button"
    class="globe-keyboard"
    aria-label={t.travelAtlas.aria.globeControls}
    aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown + - Home"
    onkeydown={handleKeydown}
    onfocus={stopAutoRotation}
    onclick={() => resetView()}
  >
    {t.travelAtlas.recenter}
  </button>
</div>

<style>
  .globe-shell {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .globe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    background: #d8e6eb;
    cursor: grab;
    touch-action: none;
    user-select: none;
    display: block;
    padding: 0;
    border: 0;
    appearance: none;
  }

  .globe.dragging {
    cursor: grabbing;
  }

  .globe-keyboard {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  .globe-keyboard:focus-visible {
    top: 0;
    left: 50%;
    z-index: 2;
    width: auto;
    height: auto;
    margin: 0;
    padding: 6px 10px;
    overflow: visible;
    clip-path: none;
    transform: translateX(-50%);
    background: var(--color-white);
    color: var(--color-travel);
    border: 1px solid currentColor;
    border-radius: 4px;
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .country {
    fill: #f8f6ee;
    stroke: #8b9699;
    stroke-width: 0.65;
    stroke-linejoin: round;
  }

  .country.highlighted {
    fill: #ebc1a9;
    stroke: #9e654c;
    stroke-width: 1;
  }
  .country.highlighted.context {
    fill-opacity: 0.18;
    stroke-opacity: 0.5;
  }

  .unit-borders,
  .region-borders {
    fill: none;
    stroke-linejoin: round;
  }

  .unit-borders {
    stroke: #a5aaa5;
    stroke-width: 0.45;
    stroke-opacity: 0.65;
  }

  .region-borders {
    stroke: #8b9699;
    stroke-width: 0.7;
    stroke-opacity: 0.85;
  }
</style>
