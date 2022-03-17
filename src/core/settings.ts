import localforage from "localforage";
import { CharType } from "./constant";

export type SettingPasswordLength = number;
export type SettingIncludeTypes = Record<CharType, boolean>;

export type Settings = {
  passwordLength: SettingPasswordLength;
  includeTypes: SettingIncludeTypes;
};
export type SettingKeys = keyof Settings;

export const DefaultSettings: Settings = {
  passwordLength: 16,
  includeTypes: {
    [CharType.Digit]: true,
    [CharType.Lower]: true,
    [CharType.Upper]: true,
  },
};

export const SettingIncludeTypesKeys: CharType[] = Object.keys(
  DefaultSettings.includeTypes
) as CharType[];

export const getSetting = async <K extends SettingKeys>(
  key: K
): Promise<Settings[K]> => {
  const value = await localforage.getItem(key);

  if (!value) return DefaultSettings[key];
  return value as Settings[K];
};

export const setSetting = async <K extends SettingKeys, V extends Settings[K]>(
  key: K,
  value: V
): Promise<V> => {
  localforage.setItem(key, value);
  return value;
};
