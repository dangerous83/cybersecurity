import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GridOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, 20]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(rgba(241,90,41,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(241,90,41,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: `${drift}px ${drift}px`,
      }}
    />
  );
};
