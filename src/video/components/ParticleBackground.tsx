import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export const ParticleBackground: React.FC<{ color?: string; count?: number }> = ({
  color = "#F15A29",
  count = 40,
}) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 13 + 2) * 100,
      size: seededRandom(i * 3 + 3) * 3 + 1,
      speed: seededRandom(i * 5 + 4) * 1.5 + 0.3,
      opacity: seededRandom(i * 11 + 5) * 0.4 + 0.05,
      delay: seededRandom(i * 17 + 6) * 40,
    }));
  }, [count]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {particles.map((p, i) => {
        const adjustedFrame = Math.max(0, frame - p.delay);
        const y = p.y - adjustedFrame * p.speed * 0.2;
        const pulse = interpolate(
          Math.sin(adjustedFrame * 0.08 + i),
          [-1, 1],
          [0.4, 1]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${((y % 130) + 130) % 130 - 15}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: p.opacity * pulse,
              boxShadow: `0 0 ${p.size * 3}px ${color}50`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
