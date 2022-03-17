import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { FC, useState } from "react";
import {
  useIncludeTypesSetting,
  usePasswordLengthSetting,
} from "../core/settings_store";
import { IncludeTypeDialog } from "./settings/include_type_dialog";
import { PasswordLengthDialog } from "./settings/password_length_dialog";

export const Settings: FC = () => {
  const [length, setLength] = usePasswordLengthSetting();
  const [types, setTypes] = useIncludeTypesSetting();

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
              secondary={types ? types.join(", ") : "..."}
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
