import type { Transition, Variants } from "motion/react";

/** Shared spring used for layout and structural UI motion. */
export const motionSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

/** Snappier spring for small chrome (sidebar, sheets). */
export const motionSpringSnappy: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 40,
  mass: 0.7,
};

/** Short tween for overlays (dialogs, backdrops, menus). */
export const motionOverlay: Transition = {
  type: "tween",
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
};

/** Exit can be slightly faster than enter. */
export const motionOverlayExit: Transition = {
  type: "tween",
  duration: 0.16,
  ease: [0.4, 0, 1, 1],
};

/** List item enter/exit (sidebar threads, projects, chats). */
export const motionListItem: Transition = {
  type: "tween",
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const dialogContentVariants: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 4 },
};

export const sheetVariants = {
  right: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 32 },
  },
  left: {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -32 },
  },
  top: {
    initial: { opacity: 0, y: -32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -32 },
  },
  bottom: {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 32 },
  },
} as const satisfies Record<string, Variants>;

export const listItemVariants: Variants = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
};

export const popoverVariants: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};
