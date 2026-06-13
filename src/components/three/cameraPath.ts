import * as THREE from "three";

export interface Waypoint {
  /** Global scroll progress (0-1) this waypoint applies at */
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  fog: { color: string; near: number; far: number };
}

/**
 * The camera's journey through the universe, keyed to global scroll progress.
 * Each waypoint marks a "beat" — a world, a transition, or a reveal.
 */
export const waypoints: Waypoint[] = [
  // World 1 — The Origin (Hero)
  { p: 0.0, pos: [0, 0, 6.4], look: [1.4, 0, 0], fov: 38, fog: { color: "#0d0a18", near: 14, far: 36 } },
  // Dolly-in toward the core, beginning the descent
  { p: 0.06, pos: [1.0, 0.25, 2.0], look: [1.4, 0, -3], fov: 50, fog: { color: "#0a0a16", near: 7, far: 24 } },
  // Wormhole / data tunnel — wide FOV, dense fog, sense of speed
  { p: 0.15, pos: [0, -0.15, -10], look: [0, 0, -24], fov: 74, fog: { color: "#06141f", near: 1.5, far: 15 } },
  // World 2 — The Technology Galaxy (Services)
  { p: 0.27, pos: [0.5, 0.6, -26], look: [-0.5, 0, -38], fov: 44, fog: { color: "#0a0f20", near: 9, far: 32 } },
  { p: 0.36, pos: [-1.2, -0.4, -40], look: [1.2, 0.2, -52], fov: 42, fog: { color: "#0c0d22", near: 9, far: 32 } },
  // World 3 — The Creation Engine (Why DNT + Process)
  { p: 0.46, pos: [2.0, 0.4, -54], look: [-2, 0, -66], fov: 45, fog: { color: "#150c20", near: 8, far: 30 } },
  { p: 0.58, pos: [-2.0, -0.3, -70], look: [2, 0.2, -82], fov: 44, fog: { color: "#171025", near: 8, far: 30 } },
  // World 4 — The Portfolio Museum
  { p: 0.66, pos: [1.6, 0.5, -86], look: [-1.4, 0, -98], fov: 43, fog: { color: "#1f160a", near: 9, far: 32 } },
  // World 5 — The Results Universe
  { p: 0.78, pos: [-1.4, -0.4, -102], look: [1.2, 0.2, -114], fov: 45, fog: { color: "#081e22", near: 8, far: 30 } },
  // World 6 — The Future
  { p: 0.9, pos: [0, 0.3, -120], look: [0, 0, -132], fov: 46, fog: { color: "#140a20", near: 7, far: 28 } },
  // Collapse — the universe folds into the contact point
  { p: 1.0, pos: [0, 0, -134], look: [0, 0, -152], fov: 27, fog: { color: "#050507", near: 1, far: 11 } },
];

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const colorA = new THREE.Color();
const colorB = new THREE.Color();

export interface CameraSample {
  position: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
}

const sample: CameraSample = {
  position: new THREE.Vector3(),
  look: new THREE.Vector3(),
  fov: 38,
  fogColor: new THREE.Color("#050507"),
  fogNear: 10,
  fogFar: 30,
};

/** Interpolates the camera path at a given global scroll progress (0-1). */
export function sampleCameraPath(progress: number): CameraSample {
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  let i = 0;
  while (i < waypoints.length - 2 && p > waypoints[i + 1].p) i++;

  const a = waypoints[i];
  const b = waypoints[i + 1];
  const span = b.p - a.p;
  const t = span > 0 ? THREE.MathUtils.clamp((p - a.p) / span, 0, 1) : 0;
  const smoothT = t * t * (3 - 2 * t); // smoothstep for gentler beats

  tmpA.set(...a.pos);
  tmpB.set(...b.pos);
  sample.position.copy(tmpA).lerp(tmpB, smoothT);

  tmpA.set(...a.look);
  tmpB.set(...b.look);
  sample.look.copy(tmpA).lerp(tmpB, smoothT);

  sample.fov = THREE.MathUtils.lerp(a.fov, b.fov, smoothT);

  colorA.set(a.fog.color);
  colorB.set(b.fog.color);
  sample.fogColor.copy(colorA).lerp(colorB, smoothT);
  sample.fogNear = THREE.MathUtils.lerp(a.fog.near, b.fog.near, smoothT);
  sample.fogFar = THREE.MathUtils.lerp(a.fog.far, b.fog.far, smoothT);

  return sample;
}
