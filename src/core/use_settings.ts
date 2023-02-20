import { useAtomValue } from "jotai/react";
import { useMemo } from "react";
import {
  includeTypesSettingAtom,
  passwordLengthSettingAtom,
} from "./settings_store";

export const useSettings = () => {
  const length = useAtomValue(passwordLengthSettingAtom);
  const includeType = useAtomValue(includeTypesSettingAtom);

  const settings = useMemo(
    () => ({
      length,
      includeType,
    }),
    [length, includeType]
  );

  return settings;
};
