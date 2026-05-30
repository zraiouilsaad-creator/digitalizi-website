"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export interface OrbitalItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
  relatedIds?: number[];
}

interface RadialOrbitalTimelineProps {
  items: OrbitalItem[];
}

export default function RadialOrbitalTimeline({ items }: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle(prev => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 190;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-visible"
      style={{ height: 520 }}
    >
      {/* Orbit ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380,
          height: 380,
          border: "1px solid var(--line)",
        }}
      />
      {/* Center hub */}
      <div
        className="absolute z-10 flex items-center justify-center rounded-full"
        style={{
          width: 64,
          height: 64,
          background: "linear-gradient(135deg, var(--blue) 0%, var(--blue-2) 100%)",
          boxShadow: "0 0 0 12px oklch(0.78 0.14 255 / .10), 0 0 0 24px oklch(0.78 0.14 255 / .05)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18"/><path d="M12 3a14 14 0 010 18"/><path d="M12 3a14 14 0 000 18"/>
        </svg>
      </div>

      {/* Nodes */}
      {items.map((item, index) => {
        const pos = calculateNodePosition(index, items.length);
        const isHovered = hoveredId === item.id;
        const Icon = item.icon;

        // Card position: above or below depending on Y
        const cardOnTop = pos.y > 0;

        return (
          <div
            key={item.id}
            className="absolute transition-all duration-300"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex: isHovered ? 300 : pos.zIndex,
              opacity: isHovered ? 1 : pos.opacity,
            }}
            onMouseEnter={() => { setHoveredId(item.id); setAutoRotate(false); }}
            onMouseLeave={() => { setHoveredId(null); setAutoRotate(true); }}
            onClick={() => router.push(`/services/${item.slug}`)}
          >
            {/* Node button */}
            <div
              className="relative flex flex-col items-center cursor-pointer select-none"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div
                className="flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: 44,
                  height: 44,
                  background: isHovered ? "var(--blue)" : "var(--surface, #fff)",
                  border: `2px solid ${isHovered ? "var(--blue)" : "var(--line)"}`,
                  color: isHovered ? "#fff" : "var(--blue-2)",
                  boxShadow: isHovered ? "0 0 20px oklch(0.78 0.14 255 / .4)" : "var(--shadow-sm)",
                  transform: isHovered ? "scale(1.25)" : "scale(1)",
                }}
              >
                <Icon size={18} />
              </div>
              <span
                className="mt-2 whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300"
                style={{
                  color: isHovered ? "var(--blue-2)" : "var(--ink-2)",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              >
                {item.title}
              </span>

              {/* Hover card */}
              {isHovered && (
                <div
                  className="absolute left-1/2 w-64 pointer-events-none"
                  style={{
                    transform: `translateX(-50%) translateY(${cardOnTop ? "calc(-100% - 56px)" : "56px"})`,
                    background: "var(--surface, #fff)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "18px 20px",
                    zIndex: 400,
                  }}
                >
                  {/* Connector line */}
                  <div
                    className="absolute left-1/2 w-px"
                    style={{
                      height: 12,
                      background: "var(--line)",
                      transform: "translateX(-50%)",
                      ...(cardOnTop ? { bottom: -12 } : { top: -12 }),
                    }}
                  />
                  <div
                    className="flex items-center gap-2 mb-2"
                  >
                    <div
                      style={{
                        width: 32, height: 32,
                        borderRadius: 10,
                        background: "var(--blue-soft)",
                        color: "var(--blue-2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)", letterSpacing: "-.01em" }}>
                      {item.title}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                  <div style={{
                    marginTop: 12, paddingTop: 10,
                    borderTop: "1px solid var(--line)",
                    fontSize: 12, color: "var(--blue-2)", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
                    Voir le détail
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
