import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { GridOverlay } from "../components/GridOverlay";
import { GlowText } from "../components/GlowText";

const BrandScreen: React.FC<{
  x: number;
  y: number;
  brandColor: string;
  brandName: string;
  delay: number;
  active: boolean;
}> = ({ x, y, brandColor, brandName, delay, active }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 12], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowSize = active
    ? interpolate(Math.sin(frame * 0.12), [-1, 1], [4, 16])
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        width: 300,
        height: 200,
        borderRadius: 14,
        border: `1px solid ${brandColor}40`,
        background: `linear-gradient(160deg, rgba(15,20,30,0.95), rgba(10,14,22,0.98))`,
        boxShadow: active ? `0 0 ${glowSize}px ${brandColor}40, 0 8px 32px rgba(0,0,0,0.4)` : "0 8px 32px rgba(0,0,0,0.4)",
        overflow: "hidden",
        padding: 16,
      }}
    >
      {/* Brand header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${brandColor}, ${brandColor}CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "white",
            fontFamily: "system-ui",
          }}
        >
          {brandName.slice(0, 2)}
        </div>
        <div style={{ color: "white", fontSize: 13, fontWeight: 600, fontFamily: "system-ui" }}>
          {brandName}
        </div>
      </div>

      {/* Mini stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
        ))}
      </div>

      {/* Mini chart area */}
      <div
        style={{
          height: 70,
          borderRadius: 8,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 268 70">
          <path
            d="M0,50 Q30,40 67,35 T134,20 T201,15 T268,10"
            fill="none"
            stroke={brandColor}
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
};

const BenefitBadge: React.FC<{ icon: string; text: string; delay: number; x: number; y: number }> = ({
  icon, text, delay, x, y,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 10], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(241,90,41,0.08)",
        border: "1px solid rgba(241,90,41,0.2)",
        borderRadius: 10,
        padding: "10px 18px",
      }}
    >
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span style={{ color: "white", fontSize: 16, fontWeight: 600, fontFamily: "system-ui" }}>{text}</span>
    </div>
  );
};

export const Scene3Benefits: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo swap animation - morph between brands
  const morphProgress = interpolate(frame, [0, 120], [0, 3], {
    extrapolateRight: "clamp",
  });
  const activeBrand = Math.floor(morphProgress) % 3;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0B0D14 0%, #111827 40%, #0D0F18 100%)",
      }}
    >
      <GridOverlay opacity={0.03} />
      <ParticleBackground color="#F15A29" count={25} />

      {/* Multiple branded platform screens */}
      <BrandScreen x={160} y={140} brandColor="#3B82F6" brandName="SecureNet" delay={5} active={activeBrand === 0} />
      <BrandScreen x={810} y={140} brandColor="#10B981" brandName="CyberGuard" delay={15} active={activeBrand === 1} />
      <BrandScreen x={1460} y={140} brandColor="#8B5CF6" brandName="ShieldPro" delay={25} active={activeBrand === 2} />

      {/* Connection lines between screens */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <line x1="460" y1="240" x2="810" y2="240" stroke="rgba(241,90,41,0.15)" strokeWidth="1" strokeDasharray="6 4" />
        <line x1="1110" y1="240" x2="1460" y2="240" stroke="rgba(241,90,41,0.15)" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* Benefit badges */}
      <BenefitBadge icon="🎨" text="Fully Branded" delay={35} x={250} y={500} />
      <BenefitBadge icon="🔒" text="Secure & Scalable" delay={50} x={780} y={500} />
      <BenefitBadge icon="🚀" text="Ready to Launch" delay={65} x={1320} y={500} />

      {/* Morphing center glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(241,90,41,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main heading */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 120,
        }}
      >
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <GlowText text="Your Brand." fontSize={40} delay={35} glowColor="#3B82F6" />
          <GlowText text="Our Security." fontSize={40} delay={50} glowColor="#F15A29" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
