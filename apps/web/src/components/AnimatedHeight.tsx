"use client";

import { motion } from "motion/react";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

import { motionSpringSnappy } from "~/lib/motion";

export function AnimatedHeight({ children }: { readonly children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const [clipping, setClipping] = useState(false);
  const hasMeasuredRef = useRef(false);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const updateHeight = () => {
      const nextHeight = Math.ceil(element.scrollHeight || element.getBoundingClientRect().height);
      setHeight((current) => {
        if (current === nextHeight) return current;
        if (hasMeasuredRef.current && current !== "auto") {
          setClipping(true);
        }
        hasMeasuredRef.current = true;
        return nextHeight;
      });
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <motion.div
      data-slot="animated-height"
      initial={false}
      animate={{ height }}
      transition={height === "auto" ? { duration: 0 } : motionSpringSnappy}
      style={{ overflow: clipping ? "hidden" : "visible" }}
      onAnimationComplete={() => {
        setClipping(false);
        setHeight("auto");
      }}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
