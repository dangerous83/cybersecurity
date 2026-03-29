import { Player } from "@remotion/player";
import { ItsecPromo, ITSEC_PROMO_FPS, ITSEC_PROMO_WIDTH, ITSEC_PROMO_HEIGHT, ITSEC_PROMO_DURATION } from "../video/ItsecPromo";

const VideoPreview = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0A0E17, #151928)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "white",
          marginBottom: 8,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        ITSEC White Label Promo
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 16,
          marginBottom: 32,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        15-second animated video preview
      </p>

      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(241,90,41,0.1)",
          border: "1px solid rgba(241,90,41,0.15)",
          width: "100%",
          maxWidth: 960,
        }}
      >
        <Player
          component={ItsecPromo}
          durationInFrames={ITSEC_PROMO_DURATION}
          compositionWidth={ITSEC_PROMO_WIDTH}
          compositionHeight={ITSEC_PROMO_HEIGHT}
          fps={ITSEC_PROMO_FPS}
          controls
          autoPlay
          loop
          style={{
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgba(241,90,41,0.1)",
            border: "1px solid rgba(241,90,41,0.2)",
            color: "#F15A29",
            fontSize: 13,
            fontFamily: "system-ui",
            fontWeight: 600,
          }}
        >
          1920 x 1080
        </div>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontFamily: "system-ui",
            fontWeight: 600,
          }}
        >
          30 FPS
        </div>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontFamily: "system-ui",
            fontWeight: 600,
          }}
        >
          15 seconds
        </div>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontFamily: "system-ui",
            fontWeight: 600,
          }}
        >
          4 scenes
        </div>
      </div>

      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
          marginTop: 24,
          fontFamily: "system-ui",
          textAlign: "center",
        }}
      >
        Run <code style={{ color: "#F15A29" }}>pnpm video:render</code> to export as MP4
      </p>
    </div>
  );
};

export default VideoPreview;
