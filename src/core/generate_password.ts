import { arrayShuffle } from "./array_shuffle";
import { CharType, digits, lowers, uppers } from "./constant";
import { getRandom } from "./get_random";

const pick = (v: number, chars: string): string => {
  return chars[Math.round((chars.length - 1) * v)];
};

export type GeneratePasswordArgs = {
  length: number;
  includeType: CharType[];

  excludeChars?: string;
};
export const generatePassword = (options: GeneratePasswordArgs) => {
  const charRandom = getRandom(options.length);
  const passwordChars = charRandom.map((v, i) => {
    if (i === 0) {
      return pick(v, lowers + uppers);
    }

    if (i - 1 < options.includeType.length - 1) {
      const type = options.includeType[i - 1];

      switch (type) {
        case CharType.Digit:
          return pick(v, digits);
        case CharType.Lower:
          return pick(v, lowers);
        case CharType.Upper:
          return pick(v, uppers);
        default:
          throw new Error(`Unknown CharType: ${type}`);
      }
    }

    return pick(v, lowers + uppers + digits);
  });

  const posRandom = getRandom(options.length - 1);
  const passwordArr = [
    ...passwordChars.slice(0, 1),
    ...arrayShuffle(passwordChars.slice(1), posRandom),
  ];

  const password = passwordArr.join("");

  return password;
};
