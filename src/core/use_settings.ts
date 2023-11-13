import { useAtomValue } from "jotai/react";
import { useMemo } from "react";
import {
  beginWithLetterSettingAtom,
  excludeSpecifyCharsSettingAtom,
  includeTypesSettingAtom,
  passwordLengthSettingAtom,
} from "./settings_store";

export const useSettings = () => {
  const length = useAtomValue(passwordLengthSettingAtom);
  const includeType = useAtomValue(includeTypesSettingAtom);
  const beginWithLetter = useAtomValue(beginWithLetterSettingAtom);
  const excludeSpecifyChars = useAtomValue(excludeSpecifyCharsSettingAtom);

  const settings = useMemo(
    () => ({
      length,
      includeType,
      beginWithLetter,
      excludeSpecifyChars,
    }),
    [length, includeType, beginWithLetter, excludeSpecifyChars]
  );

  return settings;
};
