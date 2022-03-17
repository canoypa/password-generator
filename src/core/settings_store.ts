import localforage from "localforage";
import { atom } from "recoil";
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

export const PasswordLength = atom<number>({
  key: "PasswordLength",
  default: 16,
  effects: [
    ({ setSelf, onSet }) => {
      const getInit = async () => {
        const value = await localforage.getItem("settings.passwordLength");
        if (typeof value === "number") setSelf(value);
      };
      getInit();

      onSet((v) => {
        localforage.setItem("settings.passwordLength", v);
      });
    },
  ],
});

export const IncludeTypes = atom<CharType[]>({
  key: "IncludeTypes",
  default: [CharType.Digit, CharType.Lower, CharType.Upper],
  effects: [
    ({ setSelf, onSet }) => {
      const isCharType = (v: unknown): v is CharType[] => {
        if (
          Array.isArray(v) &&
          v.every((v) => Object.values(CharType).includes(v))
        ) {
          return true;
        }
        return false;
      };

      const getInit = async () => {
        const value = await localforage.getItem("settings.includeTypes");

        if (isCharType(value)) {
          setSelf(value);
        }
      };
      getInit();

      onSet((v) => {
        localforage.setItem("settings.includeTypes", v);
      });
    },
  ],
});
