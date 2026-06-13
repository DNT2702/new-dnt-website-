import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface TechGalaxyProps {
  reduced?: boolean;
  position?: [number, number, number];
}

const insideColor = new THREE.Color("#ffc56b");
const outsideColor = new THREE.Color("#4ce0ff");

const nodeShapes = [
  { shape: "icosahedron", color: "#7c5cff" },
  { shape: "octahedron", color: "#4ce0ff" },
  { shape: "torus", color: "#ffc56b" },
  { shape: "box", color: "#a78bfa" },
  { shape: "dodecahedron", color: "#4ce0ff" },
  { shape: "torusKnot", color: "#7c5cff" },
] as const;

function GalaxyNode({ shape, color, pos }: { shape: (typeof nodeShapes)[number]["shape"]; color: string; pos: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={pos} scale={0.45}>
        {shape === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {shape === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {shape === "torus" && <torusGeometry args={[0.7, 0.25, 16, 32]} />}
        {shape === "box" && <boxGeometry args={[1.1, 1.1, 1.1]} />}
        {shape === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        {shape === "torusKnot" && <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

/** World 2 — The Technology Galaxy. A spiral of particles studded with tech-world nodes. */
export function TechGalaxy({ reduced = false, position = [0, -0.5, -32] }: TechGalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const count = reduced ? 900 : 2200;
  const radius = 14;
  const branches = 5;
  const spin = 1.4;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;
      const randomness = 0.4;
      const rx = (Math.random() - 0.5) * randomness * r;
      const ry = (Math.random() - 0.5) * randomness * 0.5;
      const rz = (Math.random() - 0.5) * randomness * r;

      const i3 = i * 3;
      positions[i3] = Math.cos(branchAngle + spinAngle) * r + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz;

      const mixed = insideColor.clone().lerp(outsideColor, r / radius);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, [count, radius, branches, spin]);

  const nodePositions = useMemo<[number, number, number][]>(() => {
    const out: [number, number, number][] = [];
    for (let i = 0; i < nodeShapes.length; i++) {
      const angle = (i / nodeShapes.length) * Math.PI * 2;
      const r = 4 + Math.random() * 6;
      out.push([Math.cos(angle) * r, (Math.random() - 0.5) * 3, Math.sin(angle) * r]);
    }
    return out;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.025;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.018;
  });

  return (
    <group ref={groupRef} position={position}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {!reduced &&
        nodeShapes.map((node, i) => <GalaxyNode key={node.shape} shape={node.shape} color={node.color} pos={nodePositions[i]} />)}
    </group>
  );
}
