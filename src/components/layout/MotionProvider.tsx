"use client";

import { MotionConfig } from "motion/react";

/**
 * Central motion policy for the whole app.
 *
 * `reducedMotion="user"` makes Motion respect the visitor's OS-level
 * "reduce motion" setting internally: transform and layout animations are
 * disabled while opacity still crossfades.
 *
 * This exists to replace a per-component pattern that was actively broken:
 *
 *     initial={useReducedMotion() ? "visible" : "hidden"}
 *
 * `useReducedMotion()` always returns false during SSR (there is no
 * matchMedia on the server), so the server rendered the "hidden" state
 * (opacity 0, translateY) while a client with reduced motion enabled
 * rendered "visible" (opacity 1, no transform). That is a hydration
 * mismatch — and it fired on every animated section for exactly the users
 * who asked for less motion.
 *
 * Setting this once keeps `initial` identical on server and client, which
 * is what hydration requires, and lets Motion handle the preference.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}