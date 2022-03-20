import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CharTypeLabel } from "../../core/constant";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
} from "../../core/settings";

type DialogProps = {
  open: boolean;
  onSubmit: (newValue: SettingIncludeTypes) => void;
  onClose: () => void;
  value: SettingIncludeTypes;
};
export const IncludeTypeDialog: FC<DialogProps> = ({
  open,
  onSubmit,
  onClose,
  value,
}) => {
  const [currentValue, setCurrentValue] = useState<SettingIncludeTypes>(value);

  // reset state on open
  useEffect(() => {
    if (open) {
      setCurrentValue(value);
    }
  }, [open, value]);

  const submit = () => {
    onSubmit(currentValue);
    onClose();
  };

  return (
    <Dialog open={open} onClose={submit} maxWidth="xs" fullWidth>
      <DialogTitle>Include Characters</DialogTitle>

      <DialogContent>
        <List>
          {SettingIncludeTypesKeys.map((type) => {
            const value = currentValue[type];
            const primary = CharTypeLabel[type];

            return (
              <ListItem
                key={type}
                disablePadding
                onClick={() =>
                  setCurrentValue({ ...currentValue, [type]: !value })
                }
              >
                <ListItemButton>
                  <ListItemText primary={primary} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={value} />
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={submit}>DONE</Button>
      </DialogActions>
    </Dialog>
  );
};
