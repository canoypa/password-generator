import { arrayShuffle } from "./array_shuffle";
import { CharType, digits, lowers, uppers } from "./constant";
import { getRandom, getSecureRandom } from "./get_random";
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
        ? charMap[type].replaceAll(options.excludeChars, "")
        : charMap[type];
    }
  }

  return chars;
};

const picker = (defaultOptions: CharOptions) => {
  const pick = (options?: CharOptions) => {
    const rand = getSecureRandom();
    const availableChars = getAvailableChars(options ?? defaultOptions);
    return availableChars[Math.round((availableChars.length - 1) * rand)];
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

  const posRandom = getRandom(options.length);

  let passwordChars = [];
  let shift = 0;

  const isIncludeLetter =
    options.includeType[CharType.Lower] || options.includeType[CharType.Upper];

  if (isIncludeLetter) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: false,
      [CharType.Lower]: options.includeType[CharType.Lower],
      [CharType.Upper]: options.includeType[CharType.Upper],
    };
    passwordChars[shift] = pick({ includeType });

    shift += 1;
  }

  if (options.includeType[CharType.Digit]) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: true,
      [CharType.Lower]: false,
      [CharType.Upper]: false,
    };
    passwordChars[shift] = pick({ includeType });
    shift += 1;
  }
  if (options.includeType[CharType.Lower]) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: false,
      [CharType.Lower]: true,
      [CharType.Upper]: false,
    };
    passwordChars[shift] = pick({ includeType });
    shift += 1;
  }
  if (options.includeType[CharType.Upper]) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: false,
      [CharType.Lower]: false,
      [CharType.Upper]: true,
    };
    passwordChars[shift] = pick({ includeType });
    shift += 1;
  }

  for (let i = shift; i < options.length; i++) {
    passwordChars[i] = pick();
  }

  const passwordArr = [
    ...(isIncludeLetter ? passwordChars.slice(0, 1) : []),
    ...arrayShuffle(
      isIncludeLetter ? passwordChars.slice(1) : passwordChars,
      posRandom
    ),
  ];

  const password = passwordArr.join("");

  return password;
};
