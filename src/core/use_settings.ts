import { useAtomValue } from "jotai/react";
import { useMemo } from "react";
import {
  beginWithLetterSettingAtom,
  includeTypesSettingAtom,
  passwordLengthSettingAtom,
} from "./settings_store";

export const useSettings = () => {
  const length = useAtomValue(passwordLengthSettingAtom);
  const includeType = useAtomValue(includeTypesSettingAtom);
  const beginWithLetter = useAtomValue(beginWithLetterSettingAtom);

  const settings = useMemo(
    () => ({
      length,
      includeType,
      beginWithLetter,
    }),
    [length, includeType, beginWithLetter]
  );

  return settings;
};
