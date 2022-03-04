import createCache from "@emotion/cache";
import { EmotionCache } from "@emotion/react";

export const createEmotionCache = (): EmotionCache => {
  return createCache({ key: "css" });
};
