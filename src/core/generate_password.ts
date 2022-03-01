import { arrayShuffle } from "./array_shuffle";
import { CharType, digits, lowers, uppers } from "./constant";
import { getRandom } from "./get_random";

const pick = (rand: number, chars: string): string => {
  return chars[Math.round((chars.length - 1) * rand)];
};

const getEnableChars = (excludeChars: string): Record<CharType, string> => {
  const excludeRegexp = new RegExp(`[${excludeChars}]`, "g");

  const chars: Record<CharType, string> = {
    [CharType.Digit]: digits.replace(excludeRegexp, ""),
    [CharType.Lower]: lowers.replace(excludeRegexp, ""),
    [CharType.Upper]: uppers.replace(excludeRegexp, ""),
  };

  return chars;
};

const getAvailableChars = (
  enableChars: Record<CharType, string>,
  includeTypes: CharType[]
): string => {
  let chars = "";

  for (const type of includeTypes) {
    chars += enableChars[type];
  }

  return chars;
};

export type GeneratePasswordArgs = {
  length: number;
  includeType: CharType[];

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
    options.includeType.includes(CharType.Lower) ||
    options.includeType.includes(CharType.Upper);

  if (isIncludeLetter) {
    const chars = options.includeType
      .filter((v) => v === CharType.Lower || v === CharType.Upper)
      .map((v) => enableChars[v])
      .join("");

    passwordChars[shift] = pick(charRandom[shift], chars);

    shift += 1;
  }

  if (options.includeType.includes(CharType.Digit)) {
    passwordChars[shift] = pick(charRandom[shift], enableChars.digit);
    shift += 1;
  }
  if (options.includeType.includes(CharType.Lower)) {
    passwordChars[shift] = pick(charRandom[shift], enableChars.lower);
    shift += 1;
  }
  if (options.includeType.includes(CharType.Upper)) {
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
