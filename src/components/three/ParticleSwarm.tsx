import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleSwarm({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      speeds[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const pos = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x * 3;
    const py = state.pointer.y * 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const ox = arr[ix];
      const oy = arr[ix + 1];
      const angle = t * speeds[i] * 0.05;
      const dx = Math.cos(angle) * 0.0025;
      const dy = Math.sin(angle) * 0.0025;
      const toPx = (px - ox) * 0.0008;
      const toPy = (py - oy) * 0.0008;
      arr[ix] = ox + dx + toPx;
      arr[ix + 1] = oy + dy + toPy;
    }
    pos.needsUpdate = true;
    points.rotation.y = t * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
