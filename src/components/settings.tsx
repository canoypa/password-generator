import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useAtom } from "jotai/react";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { CharTypeLabel } from "../core/constant";
import { SettingIncludeTypes, SettingIncludeTypesKeys } from "../core/settings";
import {
  includeTypesSettingAtom,
  passwordLengthSettingAtom,
} from "../core/settings_store";

const IncludeTypeDialog = dynamic(
  () => import("./settings/include_type_dialog")
);
const PasswordLengthDialog = dynamic(
  () => import("./settings/password_length_dialog")
);

const getIncludeTypesLabel = (types: SettingIncludeTypes): string => {
  return SettingIncludeTypesKeys.reduce<string[]>((pre, type) => {
    if (types[type]) return [...pre, CharTypeLabel[type]];
    return pre;
  }, []).join(", ");
};

export const Settings: FC = () => {
  const [length, setLength] = useAtom(passwordLengthSettingAtom);
  const [types, setTypes] = useAtom(includeTypesSettingAtom);

  const [lengthOpen, setLengthOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);

  return (
    <>
      <List>
        <ListSubheader>Settings</ListSubheader>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setLengthOpen(true)}>
            <ListItemText
              primary="Password Length"
              secondary={length ?? "..."}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setTypesOpen(true)}>
            <ListItemText
              primary="Include Characters"
              secondary={types ? getIncludeTypesLabel(types) : "..."}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {length && (
        <PasswordLengthDialog
          open={lengthOpen}
          onSubmit={(v) => setLength(v)}
          onClose={() => setLengthOpen(false)}
          value={length}
        />
      )}

      {types && (
        <IncludeTypeDialog
          open={typesOpen}
          onSubmit={(v) => setTypes(v)}
          onClose={() => setTypesOpen(false)}
          value={types}
        />
      )}
    </>
  );
};
