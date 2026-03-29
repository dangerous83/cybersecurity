import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { GridOverlay } from "../components/GridOverlay";
import { GlowText } from "../components/GlowText";

const SecurityIcon: React.FC<{ x: number; y: number; delay: number; icon: string }> = ({
  x, y, delay, icon,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 12], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = interpolate(
    Math.sin(frame * 0.1 + delay),
    [-1, 1],
    [4, 12]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        fontSize: 28,
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        background: "rgba(241,90,41,0.1)",
        border: "1px solid rgba(241,90,41,0.25)",
        boxShadow: `0 0 ${glow}px rgba(241,90,41,0.3)`,
      }}
    >
      {icon}
    </div>
  );
};

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  // Dashboard reveal
  const dashReveal = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashScale = interpolate(frame, [5, 30], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Light sweep
  const sweepX = interpolate(frame, [20, 60], [-200, 1200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Secure data animation - flowing lines
  const dataFlow = interpolate(frame, [0, 120], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0B0D14 0%, #0F1623 40%, #0D0F18 100%)",
      }}
    >
      <GridOverlay opacity={0.04} />
      <ParticleBackground color="#F15A29" count={30} />

      {/* Clean dashboard mockup */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: `translate(-50%, -50%) scale(${dashScale})`,
          opacity: dashReveal,
          width: 780,
          height: 420,
          borderRadius: 16,
          border: "1px solid rgba(241,90,41,0.2)",
          background: "linear-gradient(180deg, rgba(15,22,35,0.95) 0%, rgba(11,13,20,0.98) 100%)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.5), 0 0 40px rgba(241,90,41,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            height: 48,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "linear-gradient(135deg, #F15A29, #FF8C42)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 800,
                color: "white",
                fontFamily: "system-ui",
              }}
            >
              IT
            </div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 600, fontFamily: "system-ui" }}>
              ITSEC Platform
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 60, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ width: 60, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ width: 60, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>

        {/* Dashboard content */}
        <div style={{ display: "flex", height: "calc(100% - 48px)" }}>
          {/* Sidebar */}
          <div
            style={{
              width: 180,
              borderRight: "1px solid rgba(255,255,255,0.04)",
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {["Dashboard", "Security", "Users", "Reports", "Settings"].map((item, i) => (
              <div
                key={i}
                style={{
                  height: 32,
                  borderRadius: 6,
                  background: i === 0 ? "rgba(241,90,41,0.15)" : "transparent",
                  border: i === 0 ? "1px solid rgba(241,90,41,0.2)" : "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  color: i === 0 ? "#F15A29" : "rgba(255,255,255,0.4)",
                  fontSize: 12,
                  fontFamily: "system-ui",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main area */}
          <div style={{ flex: 1, padding: 20 }}>
            {/* Stats row */}
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Protected", value: "99.9%", color: "#00C853" },
                { label: "Threats Blocked", value: "2,847", color: "#F15A29" },
                { label: "Uptime", value: "99.99%", color: "#2196F3" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "system-ui" }}>
                    {stat.label}
                  </div>
                  <div style={{ color: stat.color, fontSize: 22, fontWeight: 700, fontFamily: "system-ui", marginTop: 4 }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div
              style={{
                height: 180,
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 560 180">
                <defs>
                  <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F15A29" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F15A29" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,140 Q70,120 140,100 T280,70 T420,40 T560,25"
                  fill="none"
                  stroke="#F15A29"
                  strokeWidth="2"
                  strokeDasharray="800"
                  strokeDashoffset={interpolate(frame, [15, 70], [800, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}
                />
                <path
                  d="M0,140 Q70,120 140,100 T280,70 T420,40 T560,25 L560,180 L0,180 Z"
                  fill="url(#secGrad)"
                  opacity={interpolate(frame, [40, 70], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Light sweep effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: sweepX,
            width: 100,
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Floating security icons */}
      <SecurityIcon x={120} y={160} delay={20} icon="🔒" />
      <SecurityIcon x={1700} y={200} delay={30} icon="🛡️" />
      <SecurityIcon x={150} y={700} delay={40} icon="🔐" />
      <SecurityIcon x={1680} y={680} delay={50} icon="✓" />

      {/* Secure data flow lines */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <circle
          cx="960"
          cy="470"
          r={interpolate(frame, [30, 80], [0, 500], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}
          fill="none"
          stroke="rgba(241,90,41,0.06)"
          strokeWidth="1"
        />
        <circle
          cx="960"
          cy="470"
          r={interpolate(frame, [40, 90], [0, 350], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}
          fill="none"
          stroke="rgba(241,90,41,0.04)"
          strokeWidth="1"
          strokeDasharray="8 8"
          strokeDashoffset={dataFlow}
        />
      </svg>

      {/* Main text */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        <GlowText
          text="ITSEC White Label Platform"
          fontSize={50}
          glowColor="#F15A29"
          delay={10}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
