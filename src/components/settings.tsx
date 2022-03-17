import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { SettingIncludeTypesKeys } from "../core/settings";
import { IncludeTypes, PasswordLength } from "../core/settings_store";
import { IncludeTypeDialog } from "./settings/include_type_dialog";
import { PasswordLengthDialog } from "./settings/password_length_dialog";

export const Settings: FC = () => {
  const [length, setLength] = useRecoilState(PasswordLength);
  const [types, setTypes] = useRecoilState(IncludeTypes);

  const [lengthOpen, setLengthOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);

  return (
    <>
      <List>
        <ListSubheader>Settings</ListSubheader>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setLengthOpen(true)}>
            <ListItemText primary="Password Length" secondary={length} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setTypesOpen(true)}>
            <ListItemText
              primary="Include Characters"
              secondary={SettingIncludeTypesKeys.reduce<string[]>(
                (pre, type) => {
                  if (types[type]) return [...pre, type];
                  return pre;
                },
                []
              ).join(", ")}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <PasswordLengthDialog
        open={lengthOpen}
        onSubmit={(v) => setLength(v)}
        onClose={() => setLengthOpen(false)}
        value={length}
      />

      <IncludeTypeDialog
        open={typesOpen}
        onSubmit={(v) => setTypes(v)}
        onClose={() => setTypesOpen(false)}
        value={types}
      />
    </>
  );
};
