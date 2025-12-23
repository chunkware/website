"use client";
import React, { type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative inline-flex overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-8 w-8 sm:h-10 sm:w-10 bg-[radial-gradient(var(--accent,#48A0F3)_40%,transparent_60%)] opacity-[0.95]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-center border border-white/10 bg-[rgba(8,8,10,0.6)] text-sm text-white antialiased backdrop-blur-xl px-4 py-2",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>("");
  const progress = useMotionValue<number>(0);
  const lengthRef = useRef<number | null>(null);

  useAnimationFrame((time) => {
    // Guard against calling getTotalLength on a non-rendered SVG element
    // (can throw InvalidStateError). If the element isn't ready yet,
    // skip this frame and try again on the next tick.
    const el = pathRef.current as any;
    if (!el || typeof el.getTotalLength !== "function") return;

    // Cache the path length once it's available to avoid repeated measurement
    if (lengthRef.current == null) {
      try {
        const measured = el.getTotalLength();
        if (measured && measured > 0) lengthRef.current = measured;
        else return;
      } catch (err) {
        // Element not yet rendered or invalid; retry next frame
        return;
      }
    }

    const length = lengthRef.current as number;
    if (length && length > 0) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    try {
      const el = pathRef.current as any;
      if (!el || typeof el.getPointAtLength !== "function") return 0;
      const pt = el.getPointAtLength(val);
      return pt?.x ?? 0;
    } catch (err) {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    try {
      const el = pathRef.current as any;
      if (!el || typeof el.getPointAtLength !== "function") return 0;
      const pt = el.getPointAtLength(val);
      return pt?.y ?? 0;
    } catch (err) {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
