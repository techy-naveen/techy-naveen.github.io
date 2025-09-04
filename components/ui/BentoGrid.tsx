// components/ui/BentoGrid.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IoCopyOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import MagicButton from "../MagicButton";

// dynamically import the client-side Lottie wrapper (no SSR)
const LottieClient = dynamic(() => import("./LottieClient"), { ssr: false });

type BentoGridProps = {
  className?: string;
  children?: React.ReactNode;
};

type BentoGridItemProps = {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
};

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        // responsive grid with larger gaps as requested
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["VueJS", "NuxtJS", "GraphQL"];

  const [copied, setCopied] = useState(false);
  const confettiRef = useRef<HTMLDivElement | null>(null);

  // handle copy
  const handleCopy = async () => {
    const text = "hsu@jsmastery.pro";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // auto reset after a bit
      setTimeout(() => setCopied(false), 3500);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col justify-between space-y-4",
        className
      )}
      style={{
        background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full w-full relative`}>
        <div className="w-full h-full absolute inset-0">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center w-full h-full")}
            />
          )}
        </div>

        <div className={`absolute right-0 -bottom-5 ${id === 5 ? "w-full opacity-80" : ""}`}>
          {spareImg && (
            <img src={spareImg} alt={spareImg} className="object-cover object-center w-full h-full" />
          )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl" />
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-10"
          )}
        >
          {/* description (lighter) */}
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3]">
            {description}
          </div>

          {/* title */}
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold mt-0">{title}</div>

          {/* GitHub 3D globe */}
          {id === 2 && <GridGlobe />}

          {/* tech stack */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>

              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* copy + confetti */}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* confetti Lottie (dynamically imported client component) */}
              <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "hidden"}`}
                style={{ width: 300, height: 200, pointerEvents: "none" }}
                ref={confettiRef}
              >
                {/* use LottieClient and load JSON from public folder to avoid bundling */}
                {copied && (
                  <LottieClient
                    path="/animations/confetti.json"
                    loop={false}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                    // force remount each time
                    key={Date.now()}
                  />
                )}
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
                aria-label="Copy email"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
