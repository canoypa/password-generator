import {
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
import { FC, useState } from "react";
import { CharTypeLabel } from "../../core/constant";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
} from "../../core/settings";
import { TextButton } from "../Button";

type FragmentProps = {
  onSubmit: (newValue: SettingIncludeTypes) => void;
  onClose: () => void;
  value: SettingIncludeTypes;
};
export const IncludeTypeFragment: FC<FragmentProps> = ({
  onSubmit,
  onClose,
  value,
}) => {
  const [currentValue, setCurrentValue] = useState<SettingIncludeTypes>(value);

  const submit = () => {
    onSubmit(currentValue);
    onClose();
  };

  return (
    <>
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
        <TextButton onClick={submit}>OK</TextButton>
      </DialogActions>
    </>
  );
};

type DialogProps = {
  open: boolean;
} & FragmentProps;
export const IncludeTypeDialog: FC<DialogProps> = ({
  open,
  onSubmit,
  onClose,
  value,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <IncludeTypeFragment
        onClose={onClose}
        onSubmit={onSubmit}
        value={value}
      />
    </Dialog>
  );
};
