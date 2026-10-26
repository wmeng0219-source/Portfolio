import React, { useEffect, useState } from "react";
import ParticleText from "../ParticleText";

// Keep the semantic heading and a readable fallback outside the vendor component.
export default function ParticleTitle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let supported = false;
    if (
      typeof window.CanvasRenderingContext2D === "function" &&
      typeof ResizeObserver === "function" &&
      typeof IntersectionObserver === "function"
    ) {
      try {
        supported = !!document.createElement("canvas").getContext("2d");
      } catch {
        supported = false;
      }
    }
    const update = () => setActive(supported && !motion.matches);
    update();
    motion.addEventListener?.("change", update);
    return () => motion.removeEventListener?.("change", update);
  }, []);

  return (
    <h1
      className="hero-display-title"
      data-particle-active={active}
      tabIndex={-1}
      aria-label="WEN MENG"
    >
      {active ? (
        <ParticleText
          text="WEN MENG"
          fullScreen
          color="#ffffff"
          highlightColor="#9edbb3"
          introColor="#9edbb3"
          fontFamily='"Anton", sans-serif'
          fontWeight={400}
          fontSize="clamp(96px, 20cqw, 232px)"
          maxParticles={10000}
          density={4}
          particleSize={2.2}
          scatter={340}
          burstStrength={1.8}
          pointerRepel={42}
          repelRadius={120}
          idleDrift={0.8}
        />
      ) : (
        <>
          <span>WEN</span> <span>MENG</span>
        </>
      )}
    </h1>
  );
}
