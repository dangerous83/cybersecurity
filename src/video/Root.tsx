import { Composition } from "remotion";
import {
  ItsecPromo,
  ITSEC_PROMO_DURATION,
  ITSEC_PROMO_FPS,
  ITSEC_PROMO_HEIGHT,
  ITSEC_PROMO_WIDTH,
} from "./ItsecPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ItsecWhiteLabelPromo"
        component={ItsecPromo}
        durationInFrames={ITSEC_PROMO_DURATION}
        fps={ITSEC_PROMO_FPS}
        width={ITSEC_PROMO_WIDTH}
        height={ITSEC_PROMO_HEIGHT}
      />
    </>
  );
};
