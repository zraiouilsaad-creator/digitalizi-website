"use client";

import {
  ContainerScroll,
  ContainerSticky,
  ContainerAnimated,
  ContainerInset,
  HeroVideo,
} from "@/components/ui/animated-video-on-scroll";

export default function VideoScrollSection() {
  return (
    <ContainerScroll className="h-[280vh]">
      <ContainerSticky
        className="flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
        style={{
          background: "radial-gradient(60% 50% at 50% 30%, oklch(0.22 0.08 262) 0%, oklch(0.12 0.04 262) 60%, oklch(0.10 0.02 262) 100%)",
        }}
      >
        <ContainerAnimated className="text-center mb-8 space-y-4 max-w-xl mx-auto">
          <span
            className="kicker"
            style={{ color: "oklch(0.78 0.14 255)", justifyContent: "center" }}
          >
            L'IT pensé autrement
          </span>
          <h2
            className="h-section"
            style={{ color: "#f0eef9", textAlign: "center", margin: "12px 0 0" }}
          >
            Des systèmes conçus pour{" "}
            <em style={{ color: "oklch(0.78 0.14 255)", fontStyle: "normal" }}>durer et performer.</em>
          </h2>
          <p style={{ color: "oklch(0.70 0.06 262)", fontSize: 17, lineHeight: 1.6 }}>
            Chaque infrastructure que nous construisons est pensée pour l'échelle, la résilience et la sécurité à long terme.
          </p>
        </ContainerAnimated>

        <ContainerInset
          className="w-full max-w-4xl mx-auto"
          style={{ maxHeight: 480 }}
          insetYRange={[8, 0]}
          insetXRange={[8, 0]}
          roundednessRange={[32, 16]}
        >
          <HeroVideo
            src="https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_30fps.mp4"
            className="w-full object-cover"
            style={{ maxHeight: 480 }}
          />
        </ContainerInset>
      </ContainerSticky>
    </ContainerScroll>
  );
}
