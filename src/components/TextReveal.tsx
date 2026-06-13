import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Stagger by "words" or "chars" */
  by?: "words" | "chars";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Animate immediately on mount instead of waiting for scroll into view (use for above-the-fold content) */
  immediate?: boolean;
}

const container = {
  hidden: {},
  visible: {},
};

export function TextReveal({ text, className, delay = 0, by = "words", as = "span", immediate = false }: TextRevealProps) {
  const pieces = by === "words" ? text.split(" ") : text.split("");
  const Component = motion[as];
  const stagger = by === "words" ? 0.06 : 0.02;

  const itemVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, delay: delay + i * stagger, ease: EASE_PREMIUM },
    }),
  };

  return (
    <Component
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
    >
      {pieces.map((piece, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span className="inline-block" custom={i} variants={itemVariants}>
              {piece}
            </motion.span>
          </span>
          {by === "words" && i < pieces.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
