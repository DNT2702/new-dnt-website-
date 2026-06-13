import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { sampleCameraPath } from "./cameraPath";

interface CameraRigProps {
  progress: MotionValue<number>;
}

/**
 * The film camera. Reads global scroll progress and flies the camera through
 * the waypoint path, blending fog/atmosphere between worlds and adding a
 * gentle drift + pointer-tracking for a "hand on the camera" feel.
 */
export function CameraRig({ progress }: CameraRigProps) {
  const { camera, scene } = useThree();
  const fog = useRef(new THREE.Fog("#0d0a18", 14, 36));
  const currentLook = useRef(new THREE.Vector3(1.4, 0, 0));
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useEffect(() => {
    scene.fog = fog.current;
    scene.background = fog.current.color.clone();
  }, [scene]);

  useFrame((state, delta) => {
    const p = progress.get();
    const s = sampleCameraPath(p);

    const t = state.clock.elapsedTime;
    const driftX = Math.sin(t * 0.12) * 0.25 + state.pointer.x * 0.5;
    const driftY = Math.cos(t * 0.1) * 0.12 + state.pointer.y * 0.25;

    targetPos.current.set(s.position.x + driftX, s.position.y + driftY, s.position.z);
    targetLook.current.copy(s.look);

    const posDamp = 1 - Math.pow(0.0008, delta);
    const lookDamp = 1 - Math.pow(0.002, delta);

    camera.position.lerp(targetPos.current, posDamp);
    currentLook.current.lerp(targetLook.current, lookDamp);
    camera.lookAt(currentLook.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, s.fov, 0.035);
      camera.updateProjectionMatrix();
    }

    fog.current.color.lerp(s.fogColor, 0.04);
    fog.current.near = THREE.MathUtils.lerp(fog.current.near, s.fogNear, 0.04);
    fog.current.far = THREE.MathUtils.lerp(fog.current.far, s.fogFar, 0.04);

    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(s.fogColor, 0.04);
    }
  });

  return null;
}
