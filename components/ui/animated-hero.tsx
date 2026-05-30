"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedSlogans({ slogans, className, ...rest }: {
  slogans: React.ReactNode[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrent(prev => (prev + 1) % slogans.length);
    }, 2800);
    return () => clearTimeout(id);
  }, [current, slogans.length]);

  return (
    <div
      className={className}
      style={{ position: "relative", height: "3.2em", overflow: "hidden" }}
      {...rest}
    >
      {slogans.map((slogan, index) => (
        <motion.span
          key={index}
          style={{ position: "absolute", left: 0, right: 0 }}
          initial={{ opacity: 0, y: 40 }}
          animate={
            current === index
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: current > index ? -40 : 40 }
          }
          transition={{ type: "spring", stiffness: 50, damping: 14 }}
        >
          {slogan}
        </motion.span>
      ))}
    </div>
  );
}
