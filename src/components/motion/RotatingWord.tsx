"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Cycles through words in place. The widest word is rendered invisibly
 * underneath so the surrounding line never reflows.
 */
export default function RotatingWord({
  words,
  className = "text-accent-400",
  interval = 2600,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={reduced ? { opacity: 0 } : { y: "70%", opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: "0%", opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: "-70%", opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.5, ease: easeOutExpo }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
    </span>
  );
}
