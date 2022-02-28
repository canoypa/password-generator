import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { IncludeTypes, PasswordLength } from "./settings_store";

export const useSettings = () => {
  const length = useRecoilValue(PasswordLength);
  const includeType = useRecoilValue(IncludeTypes);

  const settings = useMemo(
    () => ({
      length,
      includeType,
    }),
    [length, includeType]
  );

  return settings;
};
