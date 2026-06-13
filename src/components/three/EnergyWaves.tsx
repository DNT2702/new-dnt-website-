import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 3;

export function EnergyWaves({ scale = 1 }: { scale?: number }) {
  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.18 + i / COUNT) % 1;
      const s = (1.3 + phase * 2.2) * scale;
      mesh.scale.setScalar(s);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.3 * (1 - phase));
    });
  });

  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[1, 1.015, 64]} />
          <meshBasicMaterial color="#7c5cff" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}
