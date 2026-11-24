import type { AtlasGlobeCamera } from "./camera-controller.svelte.js";

export function createAtlasWheelZoom(controller: AtlasGlobeCamera) {
  const camera = controller.camera;

  return function wheelZoom(node: HTMLElement) {
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

      controller.moveCamera(
        {
          ...camera.target,
          zoom: controller.clampZoom(camera.target.zoom * factor),
        },
        false,
      );
    }

    function handleWheel(event: WheelEvent): void {
      if (!event.ctrlKey || !event.cancelable) return;

      event.preventDefault();

      controller.stopAutoRotation();
      controller.stopInertia();

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
  };
}
