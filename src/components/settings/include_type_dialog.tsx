import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CharType, CharTypeLabel } from "../../core/constant";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
} from "../../core/settings";
import { TextButton } from "../Button";

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

  const toggle = (type: CharType) => {
    return () => {
      // if true is only one, noop
      if (
        currentValue[type] &&
        Object.values(currentValue).filter(Boolean).length === 1
      ) {
        return;
      }

      setCurrentValue({ ...currentValue, [type]: !currentValue[type] });
    };
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
              <ListItem key={type} disablePadding>
                <ListItemButton dense onClick={toggle(type)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      disableRipple
                      tabIndex={-1}
                      checked={value}
                    />
                  </ListItemIcon>
                  <ListItemText primary={primary} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions>
        <TextButton onClick={submit}>Done</TextButton>
      </DialogActions>
    </Dialog>
  );
};
