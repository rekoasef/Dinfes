"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Image that wipes into view while easing out of a slight over-scale — reads
 * as a camera settling rather than a plain fade.
 *
 * The wipe is a solid overlay scaling to zero rather than an animated
 * `clip-path`: framer-motion silently refuses to run the clip-path variant
 * here, and transforms are cheaper to composite anyway.
 */
export default function RevealImage({
  src,
  alt,
  wrapperClassName = "",
  className = "object-cover",
  sizes = "100vw",
  priority = false,
  delay = 0,
  quality,
}: {
  src: string;
  alt: string;
  wrapperClassName?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
  quality?: number;
}) {
  const reduced = useReducedMotion();

  const image: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { scale: 1.18 },
        visible: { scale: 1, transition: { duration: 1.2, ease: easeOutExpo, delay } },
      };

  const curtain: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 0 } }
    : {
        hidden: { scaleY: 1 },
        visible: { scaleY: 0, transition: { duration: 0.9, ease: easeOutExpo, delay } },
      };

  return (
    <motion.div
      className={`relative overflow-hidden ${wrapperClassName}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="absolute inset-0" variants={image}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={className}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-bottom bg-brand-950"
        variants={curtain}
      />
    </motion.div>
  );
}
