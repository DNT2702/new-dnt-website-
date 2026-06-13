import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

export type OrbShape = "icosahedron" | "box" | "octahedron" | "torusKnot" | "torus" | "cone" | "dodecahedron" | "sphere";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(-vViewPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.6);

    float shift = sin(uTime * 0.6) * 0.5 + 0.5;
    vec3 holo = mix(uColorA, uColorB, shift);
    vec3 base = mix(vec3(0.02, 0.015, 0.05), holo, 0.25 + fresnel * 0.5);
    vec3 color = base + holo * fresnel * 0.9;

    gl_FragColor = vec4(color, 0.55 + fresnel * 0.45);
  }
`;

function Geometry({ shape }: { shape: OrbShape }) {
  switch (shape) {
    case "box":
      return <boxGeometry args={[1.3, 1.3, 1.3]} />;
    case "octahedron":
      return <octahedronGeometry args={[1.2, 0]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.62, 0.22, 80, 10]} />;
    case "torus":
      return <torusGeometry args={[0.8, 0.3, 16, 48]} />;
    case "cone":
      return <coneGeometry args={[0.9, 1.4, 6]} />;
    case "dodecahedron":
      return <dodecahedronGeometry args={[1, 0]} />;
    case "sphere":
      return <sphereGeometry args={[1, 32, 32]} />;
    case "icosahedron":
    default:
      return <icosahedronGeometry args={[1, 0]} />;
  }
}

function Shape({ shape, colorA, colorB }: { shape: OrbShape; colorA: string; colorB: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [colorA, colorB]
  );

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.42;
    }
    if (groupRef.current) {
      const { x, y } = state.pointer;
      pointer.current.x += (x - pointer.current.x) * 0.08;
      pointer.current.y += (y - pointer.current.y) * 0.08;
      groupRef.current.rotation.y = pointer.current.x * 0.6;
      groupRef.current.rotation.x = -pointer.current.y * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={0.85}>
        <Geometry shape={shape} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

interface MiniOrbProps {
  shape: OrbShape;
  colorA?: string;
  colorB?: string;
  className?: string;
}

export function MiniOrb({ shape, colorA = "#7c5cff", colorB = "#4ce0ff", className }: MiniOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 40 }}
      dpr={1}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      className={className ?? "!touch-none"}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={10} color={colorA} />
        <pointLight position={[-2, -1, -2]} intensity={8} color={colorB} />
        <Shape shape={shape} colorA={colorA} colorB={colorB} />
        <Sparkles count={10} scale={2.4} size={1.2} speed={0.3} color={colorB} opacity={0.6} />
      </Suspense>
    </Canvas>
  );
}
