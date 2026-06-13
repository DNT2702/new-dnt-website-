import { Sparkles } from "@react-three/drei";
import { CoreObject } from "./CoreObject";
import { HoloRings } from "./HoloRings";
import { EnergyWaves } from "./EnergyWaves";
import { ParticleSwarm } from "./ParticleSwarm";

/** World 1 — The Origin. The holographic core that births the universe. */
export function World1Origin({ reduced = false }: { reduced?: boolean }) {
  return (
    <group position={[1.4, 0, 0]}>
      <CoreObject scale={reduced ? 1.1 : 1.4} />
      <HoloRings scale={reduced ? 0.85 : 1} />
      <EnergyWaves scale={reduced ? 0.85 : 1} />
      <ParticleSwarm count={reduced ? 110 : 220} />
      <Sparkles count={reduced ? 24 : 50} scale={6} size={1.5} speed={0.25} color="#a78bfa" opacity={0.5} />
    </group>
  );
}
