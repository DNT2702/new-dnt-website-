import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { GsapLenisSync } from "@/components/GsapLenisSync";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoRaf: false,
      }}
    >
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
