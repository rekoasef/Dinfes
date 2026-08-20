"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type ProcessStep = {
  title: string;
  description: string;
};

/**
 * Four-step process with a connector line that draws itself as the section
 * scrolls through the viewport, lighting each marker as the line reaches it.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 });

  return (
    <div ref={ref} className="relative">
      {/* Connector — vertical below lg, horizontal from lg up. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[1.4375rem] top-3 bottom-3 w-px bg-white/10 lg:hidden"
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-accent-500 to-accent-400"
          style={reduced ? { scaleY: 1 } : { scaleY: progress }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[1.4375rem] hidden h-px bg-white/10 lg:block"
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-accent-500 to-accent-400"
          style={reduced ? { scaleX: 1 } : { scaleX: progress }}
        />
      </div>

      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => (
          <Step
            key={step.title}
            step={step}
            index={i}
            total={steps.length}
            progress={progress}
            reduced={!!reduced}
          />
        ))}
      </ol>
    </div>
  );
}

function Step({
  step,
  index,
  total,
  progress,
  reduced,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // The marker lights up just before the line physically reaches it.
  const threshold = index / Math.max(total - 1, 1);
  const activeAt = Math.max(threshold - 0.08, 0);

  const dotColor = useTransform(
    progress,
    [activeAt, activeAt + 0.08],
    ["rgba(255,255,255,0.12)", "rgb(229,122,31)"]
  );
  const numberColor = useTransform(
    progress,
    [activeAt, activeAt + 0.08],
    ["rgba(255,255,255,0.35)", "rgb(240,152,63)"]
  );

  return (
    <li className="relative flex gap-5 pl-0 lg:flex-col lg:gap-5">
      <motion.span
        aria-hidden="true"
        className="relative z-10 mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-brand-950"
        style={reduced ? { backgroundColor: "rgb(8,17,31)" } : undefined}
      >
        <motion.span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: reduced ? "rgb(229,122,31)" : dotColor }}
        />
      </motion.span>

      <div className="flex flex-col gap-2 lg:pr-4">
        <motion.span
          className="font-display text-sm font-bold tracking-[0.2em]"
          style={{ color: reduced ? "rgb(240,152,63)" : numberColor }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <motion.h3
          className="font-display text-lg font-bold text-white"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.08 }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="text-sm leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.08 + 0.05 }}
        >
          {step.description}
        </motion.p>
      </div>
    </li>
  );
}
