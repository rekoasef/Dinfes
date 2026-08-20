"use client";

import { motion, Variants } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const tags = {
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

/**
 * Reveals a headline one word at a time.
 *
 * Triggers on scroll (`whileInView`), not on mount — otherwise every heading
 * below the fold finishes animating before the reader ever reaches it.
 */
export default function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = "span",
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: keyof typeof tags;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  };

  const word: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { y: "110%", rotate: 3 },
        visible: { y: "0%", rotate: 0, transition: { duration: 0.75, ease: easeOutExpo } },
      };

  const MotionTag = tags[Tag];

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
