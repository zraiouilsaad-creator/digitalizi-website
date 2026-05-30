"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientConfig {
  initial: { x1: string; x2: string; y1: string; y2: string };
  animate: {
    x1: string | string[];
    x2: string | string[];
    y1: string | string[];
    y2: string | string[];
  };
  transition?: {
    duration?: number;
    repeat?: number;
    repeatType?: string;
    ease?: string;
    repeatDelay?: number;
    delay?: number;
  };
}

export interface BeamPath {
  path: string;
  gradientConfig: GradientConfig;
  connectionPoints?: Array<{ cx: number; cy: number; r: number }>;
}

interface GradientColors {
  start: string;
  middle: string;
  end: string;
}

interface PulseBeamsProps {
  children?: React.ReactNode;
  className?: string;
  background?: React.ReactNode;
  beams: BeamPath[];
  width?: number;
  height?: number;
  baseColor?: string;
  accentColor?: string;
  gradientColors?: GradientColors;
}

interface SVGsProps {
  beams: BeamPath[];
  width: number;
  height: number;
  baseColor: string;
  accentColor: string;
  gradientColors?: GradientColors;
}

const defaultGradientColors: GradientColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF",
};

const GradientColors = ({ colors = defaultGradientColors }: { colors?: GradientColors }) => (
  <>
    <stop offset="0%"   stopColor={colors.start}  stopOpacity="0" />
    <stop offset="20%"  stopColor={colors.start}  stopOpacity="1" />
    <stop offset="50%"  stopColor={colors.middle} stopOpacity="1" />
    <stop offset="100%" stopColor={colors.end}    stopOpacity="0" />
  </>
);

const SVGs = ({ beams, width, height, baseColor, accentColor, gradientColors }: SVGsProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex flex-shrink-0"
  >
    {beams.map((beam, index) => (
      <React.Fragment key={index}>
        <path d={beam.path} stroke={baseColor} strokeWidth="1" />
        <path d={beam.path} stroke={`url(#grad${index})`} strokeWidth="2" strokeLinecap="round" />
        {beam.connectionPoints?.map((point, pointIndex) => (
          <circle
            key={`${index}-${pointIndex}`}
            cx={point.cx}
            cy={point.cy}
            r={point.r}
            fill={baseColor}
            stroke={accentColor}
          />
        ))}
      </React.Fragment>
    ))}
    <defs>
      {beams.map((beam, index) => (
        <motion.linearGradient
          key={index}
          id={`grad${index}`}
          gradientUnits="userSpaceOnUse"
          initial={beam.gradientConfig.initial}
          animate={beam.gradientConfig.animate}
          // @ts-expect-error framer-motion types on SVG elements
          transition={beam.gradientConfig.transition}
        >
          <GradientColors colors={gradientColors} />
        </motion.linearGradient>
      ))}
    </defs>
  </svg>
);

export const PulseBeams = ({
  children,
  className,
  background,
  beams,
  width = 858,
  height = 434,
  baseColor = "oklch(0.35 0.08 262)",
  accentColor = "oklch(0.50 0.12 262)",
  gradientColors,
}: PulseBeamsProps) => (
  <div className={cn("w-full h-full relative flex items-center justify-center overflow-hidden", className)}>
    {background}
    <div className="relative z-10">{children}</div>
    <div className="absolute inset-0 flex items-center justify-center">
      <SVGs
        beams={beams}
        width={width}
        height={height}
        baseColor={baseColor}
        accentColor={accentColor}
        gradientColors={gradientColors}
      />
    </div>
  </div>
);
