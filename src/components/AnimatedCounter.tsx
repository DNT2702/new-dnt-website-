import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  /** Animate immediately on mount instead of waiting for scroll into view (use for above-the-fold content) */
  immediate?: boolean;
}

export function AnimatedCounter({ to, suffix = "", prefix = "", duration = 2, className, decimals = 0, immediate = false }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isInView = immediate || inView;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
