import localforage from "localforage";
import { CharType } from "./constant";

export type Settings = {
  passwordLength: number;
  includeTypes: CharType[];
};
export type SettingKeys = keyof Settings;

export const DefaultSettings: Settings = {
  passwordLength: 16,
  includeTypes: [CharType.Digit, CharType.Lower, CharType.Upper],
};

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
