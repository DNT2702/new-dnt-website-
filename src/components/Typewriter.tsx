import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function Typewriter({ text, className, delay = 0, speed = 22 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {displayed}
      <motion.span
        className="ml-0.5 inline-block h-[1.1em] w-[2px] bg-cyan"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </span>
  );
}
