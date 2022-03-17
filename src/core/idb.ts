import { DBSchema, IDBPDatabase, openDB } from "idb";
import { SettingKeys } from "./settings";

interface PGDBScheme extends DBSchema {
  settings: {
    key: SettingKeys;
    value: unknown;
  };
}

const DB_VERSION = 1;

let appDB: Promise<IDBPDatabase<PGDBScheme>> | null = null;

const upgrade = (db: IDBPDatabase<PGDBScheme>, oldVersion: number) => {
  if (oldVersion < 1) {
    db.createObjectStore("settings");
  }
};

export const getAppDatabase = async (): Promise<IDBPDatabase<PGDBScheme>> => {
  if (appDB === null && typeof window !== "undefined") {
    appDB = openDB<PGDBScheme>("PasswordGenerator", DB_VERSION, {
      upgrade,
    });
  }

  if (appDB === null) throw new Error("Invalid environment");

  return appDB;
};
