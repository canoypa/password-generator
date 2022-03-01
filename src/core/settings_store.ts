import localforage from "localforage";
import { atom } from "recoil";
import { CharType } from "./constant";

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
