import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HoloRings({ scale = 1 }: { scale?: number }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.15;
      ring1.current.rotation.x += delta * 0.03;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.1;
      ring2.current.rotation.y += delta * 0.05;
    }
    if (ring3.current) {
      ring3.current.rotation.x -= delta * 0.08;
      ring3.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group rotation={[0.4, 0.3, 0]} scale={scale}>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 16, 128]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.004, 16, 128]} />
        <meshBasicMaterial color="#4ce0ff" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 2.5, Math.PI / 6]}>
        <torusGeometry args={[1.85, 0.005, 16, 128]} />
        <meshBasicMaterial color="#ffc56b" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
