"use client";

import { useEffect, useState } from "react";

/** Development-only frame counter, sampled twice per second. */
export function FpsMeter() {
  const [framesPerSecond, setFramesPerSecond] = useState<number | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let frameCount = 0;
    let sampleStart = performance.now();
    let animationFrameId = requestAnimationFrame(function countFrame(now) {
      frameCount += 1;
      if (now - sampleStart >= SAMPLE_INTERVAL_MS) {
        setFramesPerSecond(Math.round((frameCount * 1000) / (now - sampleStart)));
        frameCount = 0;
        sampleStart = now;
      }
      animationFrameId = requestAnimationFrame(countFrame);
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (framesPerSecond === null) return null;

  return (
    <span className="rounded-full bg-stone-950/70 px-3 py-2 font-mono text-xs" aria-label="Images par seconde">
      {framesPerSecond} FPS
    </span>
  );
}

const SAMPLE_INTERVAL_MS = 500;
