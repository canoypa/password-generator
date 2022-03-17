import useSWR from "swr";
import { CharType } from "./constant";
import { getSetting, setSetting } from "./settings";

export const usePasswordLengthSetting = () => {
  const key = "passwordLength";

  const { data: state, mutate } = useSWR<number>(
    typeof window !== "undefined" && key,
    getSetting
  );

  const setState = (newState: number) =>
    mutate(setSetting(key, newState), false);

  return [state, setState] as const;
};

export const useIncludeTypesSetting = () => {
  const key = "includeTypes";

  const { data: state, mutate } = useSWR<CharType[]>(
    typeof window !== "undefined" && key,
    getSetting
  );

  const setState = (newState: CharType[]) =>
    mutate(setSetting(key, newState), false);

  return [state, setState] as const;
};
