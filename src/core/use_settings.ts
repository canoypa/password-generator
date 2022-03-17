import { useMemo } from "react";
import {
  useIncludeTypesSetting,
  usePasswordLengthSetting,
} from "./settings_store";

export const useSettings = () => {
  const [length] = usePasswordLengthSetting();
  const [includeType] = useIncludeTypesSetting();

  const settings = useMemo(
    () => ({
      length,
      includeType,
    }),
    [length, includeType]
  );

  return settings;
};
