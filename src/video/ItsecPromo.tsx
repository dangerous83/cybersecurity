import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Scene1Problem } from "./sequences/Scene1Problem";
import { Scene2Solution } from "./sequences/Scene2Solution";
import { Scene3Benefits } from "./sequences/Scene3Benefits";
import { Scene4CTA } from "./sequences/Scene4CTA";

export const ITSEC_PROMO_FPS = 30;
export const ITSEC_PROMO_WIDTH = 1920;
export const ITSEC_PROMO_HEIGHT = 1080;
export const ITSEC_PROMO_DURATION = 15 * ITSEC_PROMO_FPS; // 15 seconds = 450 frames

// Scene durations in frames
const SCENE_1_DURATION = 3 * ITSEC_PROMO_FPS;   // 0–3s  (90 frames)
const SCENE_2_DURATION = 4 * ITSEC_PROMO_FPS;   // 3–7s  (120 frames)
const SCENE_3_DURATION = 4 * ITSEC_PROMO_FPS;   // 7–11s (120 frames)
const SCENE_4_DURATION = 4 * ITSEC_PROMO_FPS;   // 11–15s (120 frames)

const TRANSITION_FRAMES = 12; // ~0.4s smooth overlap

const SceneWrapper: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeIn?: "fade" | "slide-right" | "zoom";
  fadeOut?: "fade" | "blur" | "slide-left";
}> = ({ children, durationInFrames, fadeIn = "fade", fadeOut = "fade" }) => {
  const frame = useCurrentFrame();

  // Fade in
  let inOpacity = 1;
  let inTransform = "";
  const inProgress = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (fadeIn === "fade") {
    inOpacity = inProgress;
  } else if (fadeIn === "slide-right") {
    inOpacity = inProgress;
    inTransform = `translateX(${(1 - inProgress) * 60}px)`;
  } else if (fadeIn === "zoom") {
    inOpacity = inProgress;
    inTransform = `scale(${0.92 + inProgress * 0.08})`;
  }

  // Fade out
  let outOpacity = 1;
  const outProgress = interpolate(
    frame,
    [durationInFrames - TRANSITION_FRAMES, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (fadeOut === "fade" || fadeOut === "blur") {
    outOpacity = outProgress;
  } else if (fadeOut === "slide-left") {
    outOpacity = outProgress;
  }

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(inOpacity, outOpacity),
        transform: inTransform || undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const ItsecPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0E17" }}>
      {/* Scene 1: Problem Introduction (0–3s) */}
      <Sequence from={0} durationInFrames={SCENE_1_DURATION}>
        <SceneWrapper
          durationInFrames={SCENE_1_DURATION}
          fadeIn="zoom"
          fadeOut="blur"
        >
          <Scene1Problem />
        </SceneWrapper>
      </Sequence>

      {/* Scene 2: Solution Introduction (3–7s) */}
      <Sequence from={SCENE_1_DURATION} durationInFrames={SCENE_2_DURATION}>
        <SceneWrapper
          durationInFrames={SCENE_2_DURATION}
          fadeIn="slide-right"
          fadeOut="fade"
        >
          <Scene2Solution />
        </SceneWrapper>
      </Sequence>

      {/* Scene 3: Benefits (7–11s) */}
      <Sequence
        from={SCENE_1_DURATION + SCENE_2_DURATION}
        durationInFrames={SCENE_3_DURATION}
      >
        <SceneWrapper
          durationInFrames={SCENE_3_DURATION}
          fadeIn="fade"
          fadeOut="fade"
        >
          <Scene3Benefits />
        </SceneWrapper>
      </Sequence>

      {/* Scene 4: Call to Action (11–15s) */}
      <Sequence
        from={SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION}
        durationInFrames={SCENE_4_DURATION}
      >
        <SceneWrapper
          durationInFrames={SCENE_4_DURATION}
          fadeIn="zoom"
          fadeOut="fade"
        >
          <Scene4CTA />
        </SceneWrapper>
      </Sequence>
    </AbsoluteFill>
  );
};
