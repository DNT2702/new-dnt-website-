import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { simplexNoise3D } from "./shaders/noise";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  ${simplexNoise3D}

  void main() {
    vec3 pos = position;
    float n = snoise(pos * 1.6 + uTime * 0.22);
    float displacement = n * 0.16 * uIntensity;
    vDisplacement = n;
    pos += normal * displacement;

    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  void main() {
    vec3 viewDir = normalize(-vViewPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 3.2);

    float shift = sin(vDisplacement * 3.0 + uTime * 0.35) * 0.5 + 0.5;
    vec3 holo = mix(uColorA, uColorB, shift);
    holo = mix(holo, uColorC, fresnel * 0.4);

    vec3 base = mix(vec3(0.02, 0.015, 0.05), holo, 0.22 + fresnel * 0.4);
    vec3 color = base + holo * fresnel * 0.85;

    float alpha = 0.4 + fresnel * 0.6;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function CoreObject({ scale = 1.4 }: { scale?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1 },
      uColorA: { value: new THREE.Color("#7c5cff") },
      uColorB: { value: new THREE.Color("#4ce0ff") },
      uColorC: { value: new THREE.Color("#ffc56b") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.08;
    }
    if (groupRef.current) {
      const { x, y } = state.pointer;
      pointer.current.x += (x - pointer.current.x) * 0.04;
      pointer.current.y += (y - pointer.current.y) * 0.04;
      groupRef.current.rotation.y = pointer.current.x * 0.4;
      groupRef.current.rotation.x = -pointer.current.y * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh ref={meshRef} scale={scale}>
          <icosahedronGeometry args={[1, 5]} />
          <shaderMaterial
            ref={matRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
        {/* Inner glow core */}
        <mesh scale={scale * 0.5}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#7c5cff" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
