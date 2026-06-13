import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/** Shifts children vertically as the viewport scrolls past, creating a depth layer. */
export function Parallax({ children, speed = 80, className, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("will-change-transform", className)} {...rest}>
      {children}
    </motion.div>
  );
}
