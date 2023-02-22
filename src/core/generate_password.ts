import { arrayShuffle } from "./array_shuffle";
import { CharType, digits, lowers, uppers } from "./constant";
import { getRandom } from "./get_random";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
  SettingPasswordLength,
} from "./settings";

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

type CharOptions = {
  includeType: SettingIncludeTypes;
  excludeChars?: string;
};
const picker = (defaultOptions: CharOptions) => {
  const excludeChars = defaultOptions.excludeChars ?? "";
  const enableChars: Record<CharType, string> = {
    [CharType.Digit]: digits.replaceAll(excludeChars, ""),
    [CharType.Lower]: lowers.replaceAll(excludeChars, ""),
    [CharType.Upper]: uppers.replaceAll(excludeChars, ""),
  };

  const pick = (rand: number, options?: CharOptions) => {
    const includeType = options?.includeType ?? defaultOptions.includeType;
    const availableChars = getAvailableChars(enableChars, includeType);
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

  const charRandom = getRandom(options.length);
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
    passwordChars[shift] = pick(charRandom[shift], { includeType });

    shift += 1;
  }

  if (options.includeType[CharType.Digit]) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: true,
      [CharType.Lower]: false,
      [CharType.Upper]: false,
    };
    passwordChars[shift] = pick(charRandom[shift], { includeType });
    shift += 1;
  }
  if (options.includeType[CharType.Lower]) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: false,
      [CharType.Lower]: true,
      [CharType.Upper]: false,
    };
    passwordChars[shift] = pick(charRandom[shift], { includeType });
    shift += 1;
  }
  if (options.includeType[CharType.Upper]) {
    const includeType: SettingIncludeTypes = {
      [CharType.Digit]: false,
      [CharType.Lower]: false,
      [CharType.Upper]: true,
    };
    passwordChars[shift] = pick(charRandom[shift], { includeType });
    shift += 1;
  }

  charRandom.slice(shift).forEach((v) => {
    passwordChars[shift] = pick(v);
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
