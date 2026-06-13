import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "hover" | "view" | "drag" | "text";

const RING_SIZE: Record<CursorState, number> = {
  default: 32,
  hover: 56,
  view: 96,
  drag: 80,
  text: 4,
};

const LABELS: Record<CursorState, string> = {
  default: "",
  hover: "",
  view: "View",
  drag: "Drag",
  text: "",
};

export function Cursor() {
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const dotX = useSpring(cursorX, { damping: 30, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 800, mass: 0.2 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);
  const glowSpringX = useSpring(glowX, { damping: 40, stiffness: 90, mass: 0.8 });
  const glowSpringY = useSpring(glowY, { damping: 40, stiffness: 90, mass: 0.8 });

  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const custom = target.closest<HTMLElement>("[data-cursor]");
      if (custom) {
        const val = custom.getAttribute("data-cursor") as CursorState | null;
        setState(val && val in RING_SIZE ? val : "hover");
        return;
      }
      if (target.closest("a, button, [data-cursor-hover]")) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY, glowX, glowY, isVisible]);

  const size = RING_SIZE[state];
  const label = LABELS[state];

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {/* Ambient glow that follows cursor with lag */}
      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          left: glowSpringX,
          top: glowSpringY,
          x: "-50%",
          y: "-50%",
          width: 420,
          height: 420,
          opacity: isVisible ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(124,92,255,0.18) 0%, rgba(76,224,255,0.08) 45%, transparent 75%)",
          filter: "blur(10px)",
        }}
        transition={{ opacity: { duration: 0.4 } }}
      />

      {/* Morphing ring */}
      <motion.div
        ref={ringRef}
        className="absolute flex items-center justify-center overflow-hidden rounded-full border border-white/30 will-change-transform"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
          backgroundColor:
            state === "hover" ? "rgba(124,92,255,0.12)" : state === "view" || state === "drag" ? "rgba(5,5,7,0.6)" : "transparent",
          backdropFilter: state === "view" || state === "drag" ? "blur(8px)" : "none",
        }}
        transition={{
          width: { type: "spring", damping: 22, stiffness: 320 },
          height: { type: "spring", damping: 22, stiffness: 320 },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.4 },
        }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="absolute rounded-full bg-white will-change-transform"
        style={{
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
          width: state === "default" ? 6 : 0,
          height: state === "default" ? 6 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.4 }, width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
    </div>
  );
}
