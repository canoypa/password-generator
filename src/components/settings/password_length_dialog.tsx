import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEventHandler, FC, useCallback, useState } from "react";

type InputError =
  | {
      isError: true;
      errorMessage: string;
    }
  | {
      isError: false;
      errorMessage?: never;
    };

const min = 4;
const max = 4096;

type FragmentProps = {
  onSubmit: (newValue: number) => void;
  onClose: () => void;
  value: number;
};
export const PasswordLengthFragment: FC<FragmentProps> = ({
  onSubmit,
  onClose,
  value,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(value);

  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [inputError, setInputError] = useState<InputError>({ isError: false });

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const newValue = parseInt(e.target.value, 10);

    setInputValue(e.target.value);

    if (Number.isNaN(newValue))
      setInputError({ isError: true, errorMessage: "Invalid number." });
    else if (newValue < min)
      setInputError({ isError: true, errorMessage: `Min value is ${min}.` });
    else if (newValue > max)
      setInputError({ isError: true, errorMessage: `Max value is ${max}.` });
    else setInputError({ isError: false });

    if (!Number.isNaN(newValue)) setCurrentValue(newValue);
  }, []);

  const submit = () => {
    onSubmit(inputError.isError ? value : currentValue);
    onClose();
  };

  return (
    <>
      <DialogTitle>Password Length</DialogTitle>

      <DialogContent>
        <TextField
          variant="standard"
          type="number"
          autoFocus
          fullWidth
          inputProps={{ min, max }}
          error={inputError.isError}
          helperText={inputError.errorMessage}
          value={inputValue}
          onInput={onChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={submit} disabled={inputError.isError}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

type DialogProps = {
  open: boolean;
} & FragmentProps;
export const PasswordLengthDialog: FC<DialogProps> = ({
  open,
  onSubmit,
  onClose,
  value,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <PasswordLengthFragment
        onClose={onClose}
        onSubmit={onSubmit}
        value={value}
      />
    </Dialog>
  );
};
