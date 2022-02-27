export const digits = "0123456789";
export const lowers = "abcdefghijklmnopqrstuvwxyz";
export const uppers = lowers.toUpperCase();

export const similarChars = "lI1O0";

export const CharType = {
  Digit: "digit",
  Lower: "lower",
  Upper: "upper",
} as const;
export type CharType = typeof CharType[keyof typeof CharType];
