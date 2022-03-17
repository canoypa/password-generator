import useSWR from "swr";
import {
  getSetting,
  setSetting,
  SettingIncludeTypes,
  SettingPasswordLength,
} from "./settings";

export const usePasswordLengthSetting = () => {
  const key = "passwordLength";

  const { data: state, mutate } = useSWR<SettingPasswordLength>(
    typeof window !== "undefined" && key,
    getSetting
  );

  const setState = (newState: SettingPasswordLength) =>
    mutate(setSetting(key, newState), false);

  return [state, setState] as const;
};

export const useIncludeTypesSetting = () => {
  const key = "includeTypes";

  const { data: state, mutate } = useSWR<SettingIncludeTypes>(
    typeof window !== "undefined" && key,
    getSetting
  );

  const setState = (newState: SettingIncludeTypes) =>
    mutate(setSetting(key, newState), false);

  return [state, setState] as const;
};
