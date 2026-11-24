import type { AtlasGlobeCamera } from "#lib/utils/travel-atlas-camera-controller.svelte.js";
import { clampLatitude, dragRotation } from "#lib/utils/travel-atlas-camera.js";

interface GlobeGestureOptions {
  camera: AtlasGlobeCamera;
  onDraggingChange: (dragging: boolean) => void;
  onMarkerPress: (event: PointerEvent, element: HTMLDivElement) => boolean;
}

interface PointerPosition {
  x: number;
  y: number;
}

export function createGlobePointerGestures({
  camera,
  onDraggingChange,
  onMarkerPress,
}: GlobeGestureOptions) {
  return function globePointerGestures(node: HTMLDivElement) {
    const pointers = new Map<number, PointerPosition>();

    let previousX = 0;
    let previousY = 0;
    let previousTime = 0;

    let pressX = 0;
    let pressY = 0;
    let pointerMoved = false;
    let pinchDistance: number | null = null;

    let velocityLongitude = 0;
    let velocityLatitude = 0;

    let pendingLongitude = 0;
    let pendingLatitude = 0;
    let pendingZoomFactor = 1;

    let frame: number | null = null;

    let gestureWidth = 0;
    let gestureHeight = 0;

    function applyPendingMovement(): void {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }

      if (
        pendingLongitude === 0 &&
        pendingLatitude === 0 &&
        pendingZoomFactor === 1
      ) {
        return;
      }

      const current = camera.camera.current;

      camera.moveCamera(
        {
          longitude: current.longitude + pendingLongitude,
          latitude: clampLatitude(current.latitude + pendingLatitude),
          zoom: camera.clampZoom(current.zoom * pendingZoomFactor),
        },
        false,
      );

      pendingLongitude = 0;
      pendingLatitude = 0;
      pendingZoomFactor = 1;
    }

    function scheduleMovement(): void {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        frame = null;
        applyPendingMovement();
      });
    }

    function handlePointerDown(event: PointerEvent): void {
      if (pointers.size >= 2) return;

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      if (event.pointerType !== "touch" && pointers.size > 0) {
        return;
      }

      const rect = node.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      camera.stopAutoRotation();
      camera.stopInertia();

      applyPendingMovement();

      velocityLongitude = 0;
      velocityLatitude = 0;

      gestureWidth = rect.width;
      gestureHeight = rect.height;

      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (pointers.size === 1) {
        pressX = event.clientX;
        pressY = event.clientY;
        pointerMoved = false;
      } else {
        pointerMoved = true;
      }

      node.setPointerCapture(event.pointerId);

      if (pointers.size === 1) {
        previousX = event.clientX;
        previousY = event.clientY;
        previousTime = event.timeStamp;

        pinchDistance = null;

        onDraggingChange(true);

        camera.moveCamera({ ...camera.camera.current }, false);

        return;
      }

      const positions = [...pointers.values()];

      pinchDistance = Math.hypot(
        positions[1].x - positions[0].x,
        positions[1].y - positions[0].y,
      );
    }

    function handlePointerMove(event: PointerEvent): void {
      if (!pointers.has(event.pointerId)) return;

      if (gestureWidth <= 0 || gestureHeight <= 0) {
        return;
      }

      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (Math.hypot(event.clientX - pressX, event.clientY - pressY) > 5) {
        pointerMoved = true;
      }

      if (pointers.size === 2) {
        const positions = [...pointers.values()];

        const distance = Math.hypot(
          positions[1].x - positions[0].x,
          positions[1].y - positions[0].y,
        );

        if (pinchDistance !== null && pinchDistance > 0 && distance > 0) {
          const factor = distance / pinchDistance;

          pendingZoomFactor *= factor;
          scheduleMovement();
        }

        pinchDistance = distance;
        return;
      }

      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      const elapsed = event.timeStamp - previousTime;

      previousX = event.clientX;
      previousY = event.clientY;
      previousTime = event.timeStamp;

      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      const zoom = Math.max(1, camera.camera.current.zoom);

      const { longitudeChange, latitudeChange } = dragRotation(
        deltaX / zoom,
        deltaY / zoom,
        gestureWidth,
        gestureHeight,
      );

      if (elapsed > 0) {
        if (elapsed > 80) {
          velocityLongitude = 0;
          velocityLatitude = 0;
        } else {
          const smoothing = 0.35;

          velocityLongitude =
            velocityLongitude * (1 - smoothing) +
            (longitudeChange / elapsed) * smoothing;

          velocityLatitude =
            velocityLatitude * (1 - smoothing) +
            (latitudeChange / elapsed) * smoothing;
        }
      }

      pendingLongitude += longitudeChange;
      pendingLatitude += latitudeChange;

      scheduleMovement();
    }

    function finishPointer(event: PointerEvent): void {
      if (!pointers.has(event.pointerId)) return;

      const wasPinching = pointers.size === 2;

      const isClick =
        event.type === "pointerup" && !wasPinching && !pointerMoved;

      pointers.delete(event.pointerId);

      applyPendingMovement();

      if (node.hasPointerCapture(event.pointerId)) {
        node.releasePointerCapture(event.pointerId);
      }

      if (wasPinching) {
        pinchDistance = null;
        velocityLongitude = 0;
        velocityLatitude = 0;
        pointerMoved = true;

        const remaining = [...pointers.values()][0];

        if (remaining) {
          previousX = remaining.x;
          previousY = remaining.y;
          previousTime = event.timeStamp;

          pressX = remaining.x;
          pressY = remaining.y;
        }
      }

      if (pointers.size > 0) return;

      onDraggingChange(false);

      if (isClick && onMarkerPress(event, node)) {
        return;
      }

      if (event.type === "pointerup" && !wasPinching && pointerMoved) {
        if (event.timeStamp - previousTime > 80) {
          velocityLongitude = 0;
          velocityLatitude = 0;
        }

        camera.startInertia(velocityLongitude, velocityLatitude);
      }
    }

    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerup", finishPointer);
    node.addEventListener("pointercancel", finishPointer);
    node.addEventListener("lostpointercapture", finishPointer);

    return {
      destroy() {
        node.removeEventListener("pointerdown", handlePointerDown);
        node.removeEventListener("pointermove", handlePointerMove);
        node.removeEventListener("pointerup", finishPointer);
        node.removeEventListener("pointercancel", finishPointer);
        node.removeEventListener("lostpointercapture", finishPointer);

        if (frame !== null) {
          cancelAnimationFrame(frame);
          frame = null;
        }

        pendingLongitude = 0;
        pendingLatitude = 0;
        pendingZoomFactor = 1;

        pointers.clear();
        camera.stopInertia();
      },
    };
  };
}
