import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { GridOverlay } from "../components/GridOverlay";

export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // ITSEC logo entrance
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [0, 20], [0.6, 1], {
    extrapolateRight: "clamp",
  });
  const logoGlow = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [8, 24]
  );

  // CTA text
  const ctaOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [20, 40], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Success indicator - checkmark/platform running
  const successOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const successScale = interpolate(frame, [30, 50], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade out
  const fadeOut = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Expanding rings
  const ring1 = interpolate(frame, [10, 80], [0, 400], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const ring2 = interpolate(frame, [20, 90], [0, 300], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0B0D14 0%, #151928 40%, #0D0F18 100%)",
        opacity: fadeOut,
      }}
    >
      <GridOverlay opacity={0.04} />
      <ParticleBackground color="#F15A29" count={35} />

      {/* Expanding glow rings */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <circle cx="960" cy="400" r={ring1} fill="none" stroke="rgba(241,90,41,0.06)" strokeWidth="1" />
        <circle cx="960" cy="400" r={ring2} fill="none" stroke="rgba(241,90,41,0.04)" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* Small running platform indicators */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 180,
          transform: `translate(-50%, 0) scale(${successScale})`,
          opacity: successOpacity,
          display: "flex",
          gap: 24,
        }}
      >
        {["Active", "Secure", "Protected"].map((status, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 20,
              background: "rgba(0,200,83,0.08)",
              border: "1px solid rgba(0,200,83,0.2)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00C853",
                boxShadow: "0 0 6px #00C85380",
              }}
            />
            <span style={{ color: "#00C853", fontSize: 13, fontWeight: 600, fontFamily: "system-ui" }}>
              {status}
            </span>
          </div>
        ))}
      </div>

      {/* ITSEC Logo */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: "linear-gradient(135deg, #F15A29, #FF8C42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${logoGlow}px rgba(241,90,41,0.5), 0 8px 40px rgba(241,90,41,0.3)`,
              margin: "0 auto 24px",
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: "white",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-1px",
              }}
            >
              IT
            </div>
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textAlign: "center",
              letterSpacing: "4px",
              textShadow: `0 0 ${logoGlow}px rgba(241,90,41,0.4)`,
            }}
          >
            ITSEC
          </div>
        </div>

        {/* CTA Text */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            fontSize: 38,
            fontWeight: 700,
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            marginTop: 20,
            textShadow: "0 0 20px rgba(241,90,41,0.3)",
          }}
        >
          Empower Your Business with Security
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          White Label Platform Solutions
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
