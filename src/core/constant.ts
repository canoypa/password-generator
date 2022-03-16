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

export const CharTypeValues: CharType[] = Object.values(CharType);

export const CharTypeLabel: Record<CharType, string> = {
  [CharType.Digit]: "Digit",
  [CharType.Lower]: "Lower",
  [CharType.Upper]: "Upper",
};
