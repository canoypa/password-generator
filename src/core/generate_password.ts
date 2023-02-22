import { arrayShuffle } from "./array_shuffle";
import { CharType, digits, lowers, uppers } from "./constant";
import { getRandom } from "./get_random";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
  SettingPasswordLength,
} from "./settings";

const pick = (rand: number, chars: string): string => {
  return chars[Math.round((chars.length - 1) * rand)];
};

const getEnableChars = (excludeChars: string): Record<CharType, string> => {
  const chars: Record<CharType, string> = {
    [CharType.Digit]: digits.replaceAll(excludeChars, ""),
    [CharType.Lower]: lowers.replaceAll(excludeChars, ""),
    [CharType.Upper]: uppers.replaceAll(excludeChars, ""),
  };

  return chars;
};

const getAvailableChars = (
  enableChars: Record<CharType, string>,
  includeTypes: SettingIncludeTypes
): string => {
  let chars = "";

  for (const type of SettingIncludeTypesKeys) {
    if (includeTypes[type]) chars += enableChars[type];
  }

  return chars;
};

export type GeneratePasswordArgs = {
  length: SettingPasswordLength;
  includeType: SettingIncludeTypes;

  excludeChars?: string;
};
export const generatePassword = (options: GeneratePasswordArgs) => {
  const charRandom = getRandom(options.length);
  const posRandom = getRandom(options.length);

  let passwordChars = [];
  let shift = 0;

  const enableChars = getEnableChars(options.excludeChars || "");
  const availableChars = getAvailableChars(enableChars, options.includeType);

  const isIncludeLetter =
    options.includeType[CharType.Lower] || options.includeType[CharType.Upper];

  if (isIncludeLetter) {
    const lowers = options.includeType[CharType.Lower]
      ? enableChars[CharType.Lower]
      : "";
    const uppers = options.includeType[CharType.Upper]
      ? enableChars[CharType.Upper]
      : "";

    const chars = lowers + uppers;

    passwordChars[shift] = pick(charRandom[shift], chars);

    shift += 1;
  }

  if (options.includeType[CharType.Digit]) {
    passwordChars[shift] = pick(charRandom[shift], enableChars.digit);
    shift += 1;
  }
  if (options.includeType[CharType.Lower]) {
    passwordChars[shift] = pick(charRandom[shift], enableChars.lower);
    shift += 1;
  }
  if (options.includeType[CharType.Upper]) {
    passwordChars[shift] = pick(charRandom[shift], enableChars.upper);
    shift += 1;
  }

  charRandom.slice(shift).forEach((v) => {
    passwordChars[shift] = pick(v, availableChars);
    shift += 1;
  });

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
