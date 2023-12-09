import { ListItemButton, ListItemText } from "@mui/material";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useState } from "react";
import { passwordLengthSettingAtom } from "../../core/settings_store";

const PasswordLengthDialog = dynamic(() => import("./password_length_dialog"));

export const PasswordLengthSettingField = () => {
  const [length, setLength] = useAtom(passwordLengthSettingAtom);
  const [lengthOpen, setLengthOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setLengthOpen(true)}>
        <ListItemText primary="Password Length" secondary={length ?? "..."} />
      </ListItemButton>

      {length && (
        <PasswordLengthDialog
          open={lengthOpen}
          onSubmit={(v) => setLength(v)}
          onClose={() => setLengthOpen(false)}
          value={length}
        />
      )}
    </>
  );
};
