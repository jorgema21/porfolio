<script lang="ts">
  import { onMount } from "svelte";

  import { langSignal, t } from "#lib/i18n/index.svelte.js";

  import {
    getAtlasCountryTopology,
    getAtlasWorldTopology,
    getAtlasFocusBoundary,
    type AtlasAreaCollection,
    type AtlasCountryTopology,
  } from "#lib/utils/travel-atlas/globe/topology.js";

  import {
    getAtlasMarkerPoints,
    getAtlasMarkerClusters,
    getAtlasMarkerAtPointer,
  } from "#lib/utils/travel-atlas/globe/markers.js";

  import { createGlobePointerGestures } from "#lib/utils/travel-atlas/globe/gestures.js";
  import { createAtlasWheelZoom } from "#lib/utils/travel-atlas/globe/wheel-zoom.js";

  import {
    clampLatitude,
    ATLAS_PROVINCE_ZOOM,
  } from "#lib/utils/travel-atlas/globe/camera.js";

  import { AtlasGlobeCamera } from "#lib/utils/travel-atlas/globe/camera-controller.svelte.js";

  import { fitAtlasBoundary } from "#lib/utils/travel-atlas/globe/fit.js";

  import {
    ATLAS_VIEWBOX_SIZE,
    ATLAS_MIN_ZOOM as minZoom,
    ATLAS_MAX_ZOOM as maxZoom,
    createAtlasProjection,
  } from "#lib/utils/travel-atlas/globe/geometry.js";

  import type {
    AtlasPlace,
    AtlasRelevance,
  } from "#lib/types/travel-atlas.types.js";

  import AtlasGlobeLayers from "./AtlasGlobeLayers.svelte";
  import AtlasGlobeMarkers from "./AtlasGlobeMarkers.svelte";

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

  const cameraController = new AtlasGlobeCamera(minZoom, maxZoom);
  const camera = cameraController.camera;

  const moveCamera = cameraController.moveCamera;
  const stopAutoRotation = cameraController.stopAutoRotation;
  const zoomBy = cameraController.zoomBy;
  const rotateBy = cameraController.rotateBy;

  let dragging = $state(false);
  let globeElement: HTMLDivElement | undefined = $state();

  let worldCountries = $state.raw<AtlasAreaCollection | null>(null);

  let overviewCountries = $state.raw<AtlasAreaCollection | null>(null);

  let countryData = $state.raw<{
    code: string;
    data: AtlasCountryTopology;
  } | null>(null);

  let mounted = false;
  let worldLoading = false;

  let worldLoadFailed = $state(false);
  let failedCountryCode = $state<string | null>(null);
  let countryRetry = $state(0);

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

    void getAtlasFocusBoundary(place, code)
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

  function cancelPendingFocus(): void {
    resetSequence += 1;
  }

  export function canStopRotation(): boolean {
    return cameraController.canStopAutoRotation;
  }

  export function stopRotation(): void {
    cameraController.stopAutoRotation();
  }

  export function hasMapLoadError(): boolean {
    return (
      worldLoadFailed ||
      (failedCountryCode !== null && failedCountryCode === countryCode)
    );
  }

  export function retryMap(): void {
    if (worldLoadFailed) {
      void loadWorldTopology();
    }

    if (failedCountryCode !== null && failedCountryCode === countryCode) {
      countryRetry += 1;
    }
  }

  const wheelZoom = createAtlasWheelZoom(cameraController, cancelPendingFocus);

  function activateMarker(
    event: PointerEvent,
    element: HTMLDivElement,
  ): boolean {
    const marker = getAtlasMarkerAtPointer(event, element, markerClusters);

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
      if (value) {
        cancelPendingFocus();
      }

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
        cameraController.stopInertia();

        moveCamera({
          ...camera.target,
          latitude: clampLatitude(camera.target.latitude + 15),
        });
        break;

      case "ArrowDown":
        stopAutoRotation();
        cameraController.stopInertia();

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

    if (event.key !== "Home") {
      cancelPendingFocus();
    }

    event.preventDefault();
  }
  async function loadWorldTopology(): Promise<void> {
    if (!mounted || worldLoading) return;

    worldLoading = true;
    worldLoadFailed = false;

    try {
      if (!overviewCountries && !worldCountries) {
        try {
          const collection = await getAtlasWorldTopology("overview");

          if (mounted) {
            overviewCountries = collection;
          }
        } catch (error: unknown) {
          if (mounted) {
            console.error("Error al cargar el mapamundi ligero:", error);
          }
        }
      }

      if (!mounted) return;

      if (!worldCountries) {
        try {
          const collection = await getAtlasWorldTopology("full");

          if (mounted) {
            worldCountries = collection;
          }
        } catch (error: unknown) {
          if (mounted) {
            worldLoadFailed = true;

            console.error("Error al cargar el mapamundi detallado:", error);
          }
        }
      }
    } finally {
      worldLoading = false;
    }
  }
  onMount(() => {
    mounted = true;

    let started = false;

    let preloadObserver: IntersectionObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;

    function initializeAtlas(): void {
      if (started || !mounted) return;

      started = true;

      void loadWorldTopology();
    }

    cameraController.startAutoRotation(focus === null);

    if (typeof IntersectionObserver === "undefined" || !globeElement) {
      initializeAtlas();
      cameraController.setViewportVisible(true);
    } else {
      preloadObserver = new IntersectionObserver(
        (entries) => {
          if (!mounted) return;

          if (entries.some((entry) => entry.isIntersecting)) {
            preloadObserver?.disconnect();
            initializeAtlas();
          }
        },
        { rootMargin: "200px 0px" },
      );

      visibilityObserver = new IntersectionObserver(
        (entries) => {
          if (!mounted) return;

          const visible = entries.some((entry) => entry.isIntersecting);

          cameraController.setViewportVisible(visible);

          if (visible) {
            initializeAtlas();
          }
        },
        { threshold: 0 },
      );

      preloadObserver.observe(globeElement);
      visibilityObserver.observe(globeElement);
    }

    return () => {
      mounted = false;
      resetSequence += 1;

      preloadObserver?.disconnect();
      visibilityObserver?.disconnect();

      cameraController.destroy();
    };
  });

  $effect(() => {
    const code = countryCode;
    const attempt = countryRetry;

    let cancelled = false;

    countryData = null;
    failedCountryCode = null;

    if (!code) return;

    void getAtlasCountryTopology(code)
      .then((data) => {
        if (!cancelled && attempt === countryRetry && data) {
          countryData = { code, data };
        }
      })
      .catch((error: unknown) => {
        if (!cancelled && attempt === countryRetry) {
          failedCountryCode = code;

          console.error("Error al cargar las subdivisiones:", error);
        }
      });

    return () => {
      cancelled = true;
    };
  });

  let projection = $derived(createAtlasProjection(camera.current));

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
      ? `${t.travelAtlas.aria.globeSelectedPrefix} ${focus.name[lang]}`
      : t.travelAtlas.aria.globe,
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
    <svg
      viewBox={`0 0 ${ATLAS_VIEWBOX_SIZE} ${ATLAS_VIEWBOX_SIZE}`}
      role="img"
      aria-label={accessibleLabel}
    >
      <AtlasGlobeLayers
        {projection}
        zoom={camera.current.zoom}
        {focus}
        {countryCode}
        {region}
        {province}
        {worldCountries}
        {overviewCountries}
        {countryData}
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
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;

    padding: 0;
    border: 0;
    border-radius: 50%;

    background: var(--atlas-color-ocean);

    cursor: grab;
    touch-action: none;
    user-select: none;
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
    padding: var(--space-2) var(--space-3);

    overflow: visible;
    clip-path: none;
    transform: translateX(-50%);

    background: var(--color-white);
    color: var(--color-travel);

    border: 1px solid currentColor;
    border-radius: var(--radius-sm);

    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
