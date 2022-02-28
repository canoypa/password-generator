import { atom } from "recoil";
import { CharType } from "./constant";

export const PasswordLength = atom<number>({
  key: "PasswordLength",
  default: 16,
});

export const IncludeTypes = atom<CharType[]>({
  key: "IncludeTypes",
  default: [CharType.Digit, CharType.Lower, CharType.Upper],
});
