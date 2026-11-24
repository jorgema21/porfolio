import { Tween, prefersReducedMotion } from "svelte/motion";
import { cubicOut } from "svelte/easing";

import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";
import {
  clampLatitude,
  initialZoomFor,
} from "#lib/utils/travel-atlas/globe/camera.js";

export interface CameraPosition {
  longitude: number;
  latitude: number;
  zoom: number;
}

export class AtlasGlobeCamera {
  readonly camera: Tween<CameraPosition>;

  private inertiaFrame: number | null = null;
  private autoRotationFrame: number | null = null;
  private previousAutoRotationTime: number | null = null;
  private autoRotationStopped = false;

  constructor(
    private readonly minZoom: number,
    private readonly maxZoom: number,
  ) {
    this.camera = new Tween<CameraPosition>(
      {
        longitude: 10,
        latitude: 38,
        zoom: minZoom,
      },
      {
        duration: 450,
        easing: cubicOut,
      },
    );
  }

  moveCamera = (position: CameraPosition, animated = true): void => {
    void this.camera.set(position, {
      duration: animated && !prefersReducedMotion.current ? 450 : 0,
      easing: cubicOut,
    });
  };

  resetView = (place: AtlasPlace | null): void => {
    this.stopAutoRotation();
    this.stopInertia();

    this.moveCamera({
      longitude: place?.coordinates[0] ?? 10,
      latitude: place?.coordinates[1] ?? 38,
      zoom: initialZoomFor(place, this.minZoom, this.maxZoom),
    });
  };

  clampZoom = (zoom: number): number => {
    return Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
  };

  zoomBy = (factor: number): void => {
    if (!Number.isFinite(factor) || factor <= 0) return;

    this.stopAutoRotation();
    this.stopInertia();

    this.moveCamera({
      ...this.camera.target,
      zoom: this.clampZoom(this.camera.target.zoom * factor),
    });
  };

  rotateBy = (degrees: number): void => {
    if (!Number.isFinite(degrees)) return;

    this.stopAutoRotation();
    this.stopInertia();

    this.moveCamera({
      ...this.camera.target,
      longitude: this.camera.target.longitude + degrees,
    });
  };

  stopInertia = (): void => {
    if (this.inertiaFrame !== null) {
      cancelAnimationFrame(this.inertiaFrame);
      this.inertiaFrame = null;
    }
  };

  startInertia = (
    velocityLongitude: number,
    velocityLatitude: number,
  ): void => {
    if (prefersReducedMotion.current) return;

    let longitudeSpeed = velocityLongitude;
    let latitudeSpeed = velocityLatitude;

    if (Math.hypot(longitudeSpeed, latitudeSpeed) < 0.015) {
      return;
    }

    let previousFrame = performance.now();

    const animate = (now: number): void => {
      const elapsed = Math.min(50, now - previousFrame);
      previousFrame = now;

      const decay = Math.pow(0.9, elapsed / 16.67);

      longitudeSpeed *= decay;
      latitudeSpeed *= decay;

      if (Math.hypot(longitudeSpeed, latitudeSpeed) < 0.003) {
        this.inertiaFrame = null;
        return;
      }

      this.moveCamera(
        {
          ...this.camera.current,
          longitude: this.camera.current.longitude + longitudeSpeed * elapsed,
          latitude: clampLatitude(
            this.camera.current.latitude + latitudeSpeed * elapsed,
          ),
        },
        false,
      );

      this.inertiaFrame = requestAnimationFrame(animate);
    };

    this.inertiaFrame = requestAnimationFrame(animate);
  };

  stopAutoRotation = (): void => {
    this.autoRotationStopped = true;

    if (this.autoRotationFrame !== null) {
      cancelAnimationFrame(this.autoRotationFrame);
      this.autoRotationFrame = null;
    }

    this.previousAutoRotationTime = null;
  };

  private animateAutoRotation = (now: number): void => {
    this.autoRotationFrame = null;

    if (this.autoRotationStopped || prefersReducedMotion.current) {
      this.stopAutoRotation();
      return;
    }

    if (document.hidden) {
      this.previousAutoRotationTime = null;
      return;
    }

    if (this.previousAutoRotationTime !== null) {
      const elapsed = Math.max(
        0,
        Math.min(50, now - this.previousAutoRotationTime),
      );

      this.moveCamera(
        {
          ...this.camera.current,
          longitude: this.camera.current.longitude + elapsed * 0.0015,
        },
        false,
      );
    }

    this.previousAutoRotationTime = now;
    this.autoRotationFrame = requestAnimationFrame(this.animateAutoRotation);
  };

  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      if (this.autoRotationFrame !== null) {
        cancelAnimationFrame(this.autoRotationFrame);
        this.autoRotationFrame = null;
      }

      this.previousAutoRotationTime = null;
      return;
    }

    if (
      !this.autoRotationStopped &&
      !prefersReducedMotion.current &&
      this.autoRotationFrame === null
    ) {
      this.autoRotationFrame = requestAnimationFrame(this.animateAutoRotation);
    }
  };

  startAutoRotation = (enabled: boolean): void => {
    if (!enabled || prefersReducedMotion.current) return;

    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.handleVisibilityChange();
  };

  destroy = (): void => {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );

    this.stopAutoRotation();
    this.stopInertia();
  };
}
