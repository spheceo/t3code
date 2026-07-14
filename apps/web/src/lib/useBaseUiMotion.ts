"use client";

import { animate, type AnimationPlaybackControls, type TargetAndTransition } from "motion";
import { useLayoutEffect, useRef, type RefObject } from "react";

import { motionOverlay, motionOverlayExit } from "./motion";

type MotionTargets = {
  readonly open: TargetAndTransition;
  readonly closed: TargetAndTransition;
};

/**
 * Drive enter/exit motion for Base UI popups using the Motion WAAPI runtime.
 *
 * Base UI keeps nodes mounted while `data-ending-style` is present and waits on
 * `element.getAnimations()` before unmounting — Motion animations are picked up
 * by that path, so exit transitions stay in sync with the dialog lifecycle.
 */
export function useBaseUiMotion(
  ref: RefObject<HTMLElement | null>,
  targets: MotionTargets,
): void {
  const targetsRef = useRef(targets);
  targetsRef.current = targets;

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    let controls: AnimationPlaybackControls | null = null;
    let openFrame = 0;

    const runOpen = () => {
      controls?.stop();
      if (openFrame) cancelAnimationFrame(openFrame);
      // Seed closed styles, then tween open so getAnimations() always sees work.
      controls = animate(element, targetsRef.current.closed, { duration: 0 });
      openFrame = requestAnimationFrame(() => {
        openFrame = 0;
        controls = animate(element, targetsRef.current.open, motionOverlay);
      });
    };

    const runClose = () => {
      if (openFrame) {
        cancelAnimationFrame(openFrame);
        openFrame = 0;
      }
      controls?.stop();
      controls = animate(element, targetsRef.current.closed, motionOverlayExit);
    };

    // Initial presence: only animate when Base UI marks the part as opening/open.
    if (element.hasAttribute("data-ending-style")) {
      runClose();
    } else if (
      element.hasAttribute("data-starting-style") ||
      element.hasAttribute("data-open")
    ) {
      runOpen();
    }

    const observer = new MutationObserver(() => {
      if (element.hasAttribute("data-ending-style")) {
        runClose();
        return;
      }
      if (element.hasAttribute("data-starting-style")) {
        runOpen();
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-starting-style", "data-ending-style"],
    });

    return () => {
      observer.disconnect();
      if (openFrame) cancelAnimationFrame(openFrame);
      controls?.stop();
    };
  }, [ref]);
}
