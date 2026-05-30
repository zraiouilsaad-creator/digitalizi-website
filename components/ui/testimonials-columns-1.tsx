"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border max-w-xs w-full"
                style={{
                  background: "var(--surface, #fff)",
                  borderColor: "var(--line)",
                  boxShadow: "0 8px 24px rgba(11,21,48,.06), 0 2px 6px rgba(11,21,48,.04)",
                }}
              >
                <p style={{ color: "var(--ink-2)", fontSize: "14.5px", lineHeight: 1.65 }}>{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="flex flex-col">
                    <div style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "-.01em", color: "var(--ink)" }}>{name}</div>
                    <div style={{ fontSize: "12.5px", color: "var(--muted)" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
