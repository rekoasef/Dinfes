"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Image that drifts against the scroll direction inside its frame.
 * The inner layer is inset so the drift never exposes an empty edge.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  wrapperClassName,
  strength = 60,
  sizes = "100vw",
  priority = false,
  quality,
}: {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  strength?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = reduced ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  const isAbsolute = wrapperClassName?.includes("absolute");

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${isAbsolute ? "" : "relative"} ${wrapperClassName ?? ""}`}
    >
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={className ?? "object-cover"}
        />
      </motion.div>
    </div>
  );
}
