import { CharType, digits, lowers, symbols, uppers } from "./constant";
import { getRandom } from "./get_random";
import {
  SettingBeginWithLetter,
  SettingExcludeSpecifyChars,
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
  SettingPasswordLength,
} from "./settings";

const charMap: Record<CharType, string> = {
  [CharType.Digit]: digits,
  [CharType.Lower]: lowers,
  [CharType.Upper]: uppers,
  [CharType.Symbol]: symbols,
};

type CharOptions = {
  includeType: SettingIncludeTypes;
  excludeSpecifyChars: SettingExcludeSpecifyChars;
};

const getAvailableChars = (options: CharOptions): string => {
  let chars = "";

  for (const type of SettingIncludeTypesKeys) {
    if (options.includeType[type]) {
      chars += options.excludeSpecifyChars.enabled
        ? charMap[type].replaceAll(
            RegExp(`[${options.excludeSpecifyChars.chars}]`, "g"),
            ""
          )
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
  beginWithLetter: SettingBeginWithLetter;
  excludeSpecifyChars: SettingExcludeSpecifyChars;
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
      const pickOptions: CharOptions = {
        includeType: {
          [CharType.Digit]: false,
          [CharType.Lower]: false,
          [CharType.Upper]: false,
          [CharType.Symbol]: false,

          [includeTypes[i]]: true,
        },
        excludeSpecifyChars: options.excludeSpecifyChars,
      };
      passwordChars.splice(pos, 0, pick(pickOptions));

      continue;
    }

    /* begin with latter */
    if (
      options.beginWithLetter &&
      i === options.length - 1 &&
      includeTypes.some((v) => v === CharType.Lower || v === CharType.Upper)
    ) {
      const pickOptions: CharOptions = {
        includeType: {
          [CharType.Digit]: false,
          [CharType.Symbol]: false,
          [CharType.Lower]: options.includeType[CharType.Lower],
          [CharType.Upper]: options.includeType[CharType.Upper],
        },
        excludeSpecifyChars: options.excludeSpecifyChars,
      };
      passwordChars.splice(0, 0, pick(pickOptions));

      continue;
    }

    passwordChars.splice(pos, 0, pick());
  }

  const password = passwordChars.join("");

  return password;
};
