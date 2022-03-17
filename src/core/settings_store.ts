import localforage from "localforage";
import { atom } from "recoil";
import { DefaultSettingIncludeTypes, SettingIncludeTypes } from "./settings";

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

export const IncludeTypes = atom<SettingIncludeTypes>({
  key: "IncludeTypes",
  default: DefaultSettingIncludeTypes,
  effects: [
    ({ setSelf, onSet }) => {
      const getInit = async () => {
        const value = await localforage.getItem("settings.includeTypes");
        if (value) setSelf(value as SettingIncludeTypes);
      };
      getInit();

      onSet((v) => {
        localforage.setItem("settings.includeTypes", v);
      });
    },
  ],
});
