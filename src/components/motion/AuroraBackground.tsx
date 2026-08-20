"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Slow-drifting colour fields used behind dark sections. */
export default function AuroraBackground({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const blobs = [
    {
      className: "absolute -left-32 -top-40 h-[34rem] w-[34rem]",
      background:
        "radial-gradient(circle, rgba(50,114,181,0.5) 0%, rgba(50,114,181,0) 70%)",
      animate: { x: [0, 50, -20, 0], y: [0, 40, 70, 0], scale: [1, 1.1, 0.95, 1] },
      duration: 20,
    },
    {
      className: "absolute -right-40 top-0 h-[30rem] w-[30rem]",
      background:
        "radial-gradient(circle, rgba(229,122,31,0.35) 0%, rgba(229,122,31,0) 70%)",
      animate: { x: [0, -40, 25, 0], y: [0, 50, -25, 0], scale: [1, 0.92, 1.08, 1] },
      duration: 24,
    },
    {
      className: "absolute bottom-[-12rem] left-1/3 h-[28rem] w-[28rem]",
      background: "radial-gradient(circle, rgba(24,58,99,0.45) 0%, rgba(24,58,99,0) 70%)",
      animate: { x: [0, 30, -30, 0], y: [0, -25, 15, 0] },
      duration: 28,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`${blob.className} rounded-full blur-3xl`}
          style={{ background: blob.background }}
          animate={reduced ? undefined : blob.animate}
          transition={
            reduced
              ? undefined
              : { duration: blob.duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
