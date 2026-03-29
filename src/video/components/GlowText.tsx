import { interpolate, useCurrentFrame } from "remotion";

interface GlowTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  delay?: number;
  fontWeight?: number;
}

export const GlowText: React.FC<GlowTextProps> = ({
  text,
  fontSize = 48,
  color = "white",
  glowColor = "#F15A29",
  delay = 0,
  fontWeight = 700,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [delay, delay + 15], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = interpolate(frame, [delay + 10, delay + 25], [0, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize,
        fontWeight,
        color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        textShadow: `0 0 ${glow}px ${glowColor}80, 0 0 ${glow * 2}px ${glowColor}30`,
        letterSpacing: "-0.5px",
      }}
    >
      {text}
    </div>
  );
};
