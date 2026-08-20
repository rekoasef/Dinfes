"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Whether the visitor asked for reduced motion.
 *
 * framer-motion's own `useReducedMotion` reads the media query during render,
 * which makes the server and the client disagree and breaks hydration. React
 * hydrates against `getServerSnapshot` (always `false`) and then re-renders
 * with the real value, so the markup always matches.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
