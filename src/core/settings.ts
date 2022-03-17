import { CharType } from "./constant";

export type SettingIncludeTypes = Record<CharType, boolean>;

export const DefaultSettingIncludeTypes: SettingIncludeTypes = {
  [CharType.Digit]: true,
  [CharType.Lower]: true,
  [CharType.Upper]: true,
};

export const SettingIncludeTypesKeys: CharType[] = Object.keys(
  DefaultSettingIncludeTypes
) as CharType[];
