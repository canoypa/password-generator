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
import { FC, useState } from "react";
import { CharType } from "../../core/constant";
import { SettingIncludeTypes } from "../../core/settings";

const formControls = [
  {
    type: CharType.Digit,
    primary: "Digit",
  },
  {
    type: CharType.Lower,
    primary: "Lower",
  },
  {
    type: CharType.Upper,
    primary: "Upper",
  },
];

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
          {formControls.map(({ type, primary }) => {
            const value = currentValue[type];

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
        <Button onClick={submit}>Ok</Button>
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
