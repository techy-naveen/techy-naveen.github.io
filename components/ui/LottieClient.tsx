// components/ui/LottieClient.tsx
"use client";

import React, { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import animationDataDefault from "@/data/confetti.json";

type Props = {
  path?: string;
  animationData?: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  keyProp?: string | number;
};

export default function LottieClient({
  path,
  animationData,
  loop = true,
  autoplay = true,
  className,
  style,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!containerRef.current) return;
      const lottie = (await import("lottie-web")).default;

      animRef.current?.destroy?.();

      const opts: any = {
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
      };

      if (path) opts.path = path;
      else if (animationData) opts.animationData = animationData;
      else opts.animationData = animationDataDefault;

      animRef.current = lottie.loadAnimation(opts);

      try {
        if (!mounted) animRef.current?.destroy?.();
      } catch (e) {}
    }

    init();

    return () => {
      mounted = false;
      try {
        animRef.current?.destroy?.();
        animRef.current = null;
      } catch (e) {}
    };
  }, [path, animationData, loop, autoplay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
      aria-hidden
    />
  );
}
