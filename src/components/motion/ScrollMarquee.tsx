"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Horizontal strip whose contents drift sideways as the section scrolls past.
 * Movement is tied to scroll position, so it stops when the reader stops.
 */
export default function ScrollMarquee({
  children,
  className = "",
  from = -8,
  to = 8,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  /** Start offset as a percentage of the strip width. */
  from?: number;
  /** End offset as a percentage of the strip width. */
  to?: number;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const start = reverse ? to : from;
  const end = reverse ? from : to;
  const x = useTransform(smooth, [0, 1], [`${reduced ? 0 : start}%`, `${reduced ? 0 : end}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex w-max gap-4 sm:gap-6">
        {children}
      </motion.div>
    </div>
  );
}
