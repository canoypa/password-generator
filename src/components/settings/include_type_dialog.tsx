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
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CharType } from "../../core/constant";

const put = (arr: CharType[], type: CharType, enable: boolean): CharType[] => {
  const filleted = arr.filter((v) => v !== type);
  return enable ? [...filleted, type] : filleted;
};

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

type FormData = {
  types: CharType[];
};

type FragmentProps = {
  onSubmit: (newValue: CharType[]) => void;
  onClose: () => void;
  value: CharType[];
};
export const IncludeTypeFragment: FC<FragmentProps> = ({
  onSubmit,
  onClose,
  value,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { types: value },
  });

  const submit: SubmitHandler<FormData> = (data) => {
    onSubmit(data.types);
    onClose();
  };

  return (
    <>
      <DialogTitle>Include Characters</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
          <List>
            <Controller
              name="types"
              control={control}
              render={({ field }) => (
                <>
                  {formControls.map(({ type, primary }) => {
                    const value = field.value.includes(type);

                    return (
                      <ListItem
                        key={type}
                        disablePadding
                        onClick={() =>
                          field.onChange(put(field.value, type, !value))
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
                </>
              )}
            />
          </List>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmit(submit)}>Ok</Button>
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
