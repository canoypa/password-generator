import { CharType } from "./constant";

export type SettingIncludeTypes = Record<CharType, boolean>;

export const DefaultSettingIncludeTypes: SettingIncludeTypes = {
  [CharType.Digit]: true,
  [CharType.Lower]: true,
  [CharType.Upper]: true,
};
