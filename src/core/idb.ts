import { DBSchema, IDBPDatabase, OpenDBCallbacks, openDB } from "idb";
import { CharType } from "./constant";
import { SettingKeys, Settings } from "./settings";

interface PGDBScheme extends DBSchema {
  settings: {
    key: SettingKeys;
    value: unknown;
  };
}

const DB_VERSION = 2;

let appDB: Promise<IDBPDatabase<PGDBScheme>> | null = null;

const upgrade: OpenDBCallbacks<PGDBScheme>["upgrade"] = async (
  db,
  oldVersion,
  _newVersion,
  transaction
) => {
  if (oldVersion < 1) {
    db.createObjectStore("settings");
  }

  // add symbol to exiting include types setting
  if (oldVersion < 2) {
    const oldValue = (await transaction
      .objectStore("settings")
      .get("includeTypes")) as Settings["includeTypes"];
    if (!oldValue) return;

    await transaction
      .objectStore("settings")
      .put({ ...oldValue, [CharType.Symbol]: true }, "includeTypes");
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
