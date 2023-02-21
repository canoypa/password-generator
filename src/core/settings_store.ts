import { atom } from "jotai";
import { getSetting, setSetting, SettingKeys, Settings } from "./settings";

const settingAtom = <K extends SettingKeys, V extends Settings[K]>(key: K) => {
  const baseAtom = atom<V | undefined>(undefined);
  baseAtom.onMount = (setAtom) => {
    getSetting(key).then((v) => setAtom(v as V));
  };

  const anAtom = atom(
    (get) => get(baseAtom),
    (_, set, newValue: V) => {
      set(baseAtom, newValue);
      setSetting(key, newValue);
    }
  );

  return anAtom;
};

export const passwordLengthSettingAtom = settingAtom("passwordLength");
export const includeTypesSettingAtom = settingAtom("includeTypes");
