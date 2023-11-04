import { CharType, digits, lowers, uppers } from "./constant";
import { getRandom } from "./get_random";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
  SettingPasswordLength,
} from "./settings";

const charMap: Record<CharType, string> = {
  [CharType.Digit]: digits,
  [CharType.Lower]: lowers,
  [CharType.Upper]: uppers,
};

type CharOptions = {
  includeType: SettingIncludeTypes;
  excludeChars?: string;
};

const getAvailableChars = (options: CharOptions): string => {
  let chars = "";

  for (const type of SettingIncludeTypesKeys) {
    if (options.includeType[type]) {
      chars += options.excludeChars
        ? charMap[type].replaceAll(RegExp(`[${options.excludeChars}]`, "g"), "")
        : charMap[type];
    }
  }

  return chars;
};

const picker = (defaultOptions: CharOptions) => {
  const pick = (options?: CharOptions) => {
    const availableChars = getAvailableChars({
      ...defaultOptions,
      ...(options ?? {}),
    });
    return availableChars[getRandom(availableChars.length)];
  };

  return pick;
};

export type GeneratePasswordArgs = {
  length: SettingPasswordLength;
  includeType: SettingIncludeTypes;

  excludeChars?: string;
};
export const generatePassword = (options: GeneratePasswordArgs) => {
  const pick = picker(options);

  const includeTypes = Object.entries(options.includeType)
    .filter(([_, v]) => v)
    .map(([k]) => k as CharType);

  let passwordChars: string[] = [];

  for (let i = 0; i < options.length; i++) {
    const pos = getRandom(passwordChars.length + 1);

    /** include all type */
    if (includeTypes[i]) {
      const includeType: SettingIncludeTypes = {
        [CharType.Digit]: false,
        [CharType.Lower]: false,
        [CharType.Upper]: false,

        [includeTypes[i]]: true,
      };
      passwordChars.splice(pos, 0, pick({ includeType }));

      continue;
    }

    /* begin with latter */
    if (
      i === options.length - 1 &&
      includeTypes.some((v) => v === CharType.Lower || v === CharType.Upper)
    ) {
      const includeType: SettingIncludeTypes = {
        [CharType.Digit]: false,
        [CharType.Lower]: options.includeType[CharType.Lower],
        [CharType.Upper]: options.includeType[CharType.Upper],
      };
      passwordChars.splice(0, 0, pick({ includeType }));

      continue;
    }

    passwordChars.splice(pos, 0, pick());
  }

  const password = passwordChars.join("");

  return password;
};
