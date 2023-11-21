import { CharType, similarChars } from "./constant";
import { getAppDatabase } from "./idb";

export type SettingPasswordLength = number;
export type SettingIncludeTypes = Record<CharType, boolean>;
export type SettingBeginWithLetter = boolean;
export type SettingExcludeSpecifyChars = { enabled: boolean; chars: string };

export type Settings = {
  passwordLength: SettingPasswordLength;
  includeTypes: SettingIncludeTypes;
  beginWithLetter: SettingBeginWithLetter;
  excludeSpecifyChars: SettingExcludeSpecifyChars;
};
export type SettingKeys = keyof Settings;

export const DefaultSettings: Settings = {
  passwordLength: 16,
  includeTypes: {
    [CharType.Digit]: true,
    [CharType.Lower]: true,
    [CharType.Upper]: true,
    [CharType.Symbol]: true,
  },
  beginWithLetter: true,
  excludeSpecifyChars: { enabled: true, chars: similarChars },
};

export const SettingIncludeTypesKeys: CharType[] = Object.keys(
  DefaultSettings.includeTypes
) as CharType[];

export const getSetting = async <K extends SettingKeys>(
  key: K
): Promise<Settings[K]> => {
  const db = await getAppDatabase();

  const value = await db.get("settings", key);

  if (value === undefined) return DefaultSettings[key];
  return value as Settings[K];
};

export const setSetting = async <K extends SettingKeys, V extends Settings[K]>(
  key: K,
  value: V
): Promise<V> => {
  const db = await getAppDatabase();

  db.put("settings", value, key);

  return value;
};
