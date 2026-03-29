import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { GridOverlay } from "../components/GridOverlay";
import { GlowText } from "../components/GlowText";

const CodeLine: React.FC<{ y: number; width: number; delay: number; color: string }> = ({
  y,
  width,
  delay,
  color,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 8], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flicker = interpolate(
    Math.sin(frame * 0.2 + delay),
    [-1, 1],
    [0.4, 1]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 40,
        width: width,
        height: 8,
        borderRadius: 4,
        backgroundColor: color,
        opacity: opacity * flicker,
        boxShadow: `0 0 8px ${color}40`,
      }}
    />
  );
};

const DashboardPanel: React.FC<{ x: number; y: number; w: number; h: number; delay: number }> = ({
  x, y, w, h, delay,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 12], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake = frame > delay + 15
    ? Math.sin(frame * 0.8) * 2
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        border: "1px solid rgba(255,80,80,0.3)",
        borderRadius: 8,
        background: "rgba(255,60,60,0.05)",
        opacity,
        transform: `translateX(${shake}px)`,
      }}
    />
  );
};

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // Red warning pulse
  const warningPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0, 0.08]
  );

  // Stress indicator - screen gets slightly red tinted over time
  const stressOverlay = interpolate(frame, [40, 80], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0B0D14 0%, #151928 40%, #0D0F18 100%)",
      }}
    >
      <GridOverlay opacity={0.03} />
      <ParticleBackground color="#FF4444" count={20} />

      {/* Complex dashboard mockup - left side */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 180,
          width: 500,
          height: 380,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 36,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 6,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28CA41" }} />
        </div>

        {/* Code lines - chaotic */}
        <CodeLine y={50} width={280} delay={5} color="#FF6B6B" />
        <CodeLine y={68} width={180} delay={8} color="#4ECDC4" />
        <CodeLine y={86} width={340} delay={11} color="#FF6B6B" />
        <CodeLine y={104} width={120} delay={14} color="#FFE66D" />
        <CodeLine y={122} width={260} delay={17} color="#4ECDC4" />
        <CodeLine y={140} width={200} delay={20} color="#FF6B6B" />
        <CodeLine y={158} width={310} delay={23} color="#FFE66D" />
        <CodeLine y={176} width={150} delay={26} color="#4ECDC4" />
        <CodeLine y={194} width={280} delay={29} color="#FF6B6B" />
        <CodeLine y={212} width={220} delay={32} color="#FFE66D" />

        {/* Error indicators */}
        <DashboardPanel x={320} y={60} w={150} h={80} delay={25} />
        <DashboardPanel x={320} y={160} w={150} h={60} delay={35} />
      </div>

      {/* Right side - more complexity panels */}
      <div style={{ position: "absolute", right: 100, top: 180 }}>
        <DashboardPanel x={0} y={0} w={320} h={120} delay={10} />
        <DashboardPanel x={0} y={140} w={320} h={100} delay={20} />
        <DashboardPanel x={0} y={260} w={320} h={120} delay={30} />
      </div>

      {/* Red warning overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,40,40,${warningPulse}) 0%, transparent 70%)`,
        }}
      />

      {/* Stress overlay */}
      <AbsoluteFill
        style={{
          background: `rgba(255,30,30,${stressOverlay})`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Main text */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 120,
        }}
      >
        <GlowText
          text="Building Your Own Platform Is Complex"
          fontSize={46}
          glowColor="#FF4444"
          delay={15}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
