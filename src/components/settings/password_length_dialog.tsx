import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  Slider,
  Stack,
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

  const onChange = useCallback((newValue: number) => {
    if (Number.isNaN(newValue))
      setInputError({ isError: true, errorMessage: "Invalid number." });
    else if (newValue < min)
      setInputError({ isError: true, errorMessage: `Min value is ${min}.` });
    else if (newValue > max)
      setInputError({ isError: true, errorMessage: `Max value is ${max}.` });
    else setInputError({ isError: false });

    if (!Number.isNaN(newValue)) setCurrentValue(newValue);
  }, []);

  const onSliderChange = useCallback((_, _newValue: number | number[]) => {
    if (typeof _newValue !== "number")
      throw new Error("newValue is not a number");

    const newValue = 2 ** _newValue;

    setInputValue(newValue.toString());
    onChange(newValue);
  }, []);

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const newValue = parseInt(e.target.value, 10);

      setInputValue(e.target.value);
      onChange(newValue);
    },
    []
  );

  const submit = () => {
    onSubmit(inputError.isError ? value : currentValue);
    onClose();
  };

  return (
    <>
      <DialogTitle>Password Length</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={3} pt={2}>
            <Slider
              min={2}
              max={5}
              value={Math.log(currentValue) / Math.log(2)}
              onChange={onSliderChange}
              step={null}
              marks={[
                { value: 2, label: "4" },
                { value: 3, label: "8" },
                { value: 4, label: "16" },
                { value: 5, label: "32" },
              ]}
            />
            <FormControl error={inputError.isError}>
              <Input
                error={inputError.isError}
                type="number"
                inputProps={{ min, max }}
                autoFocus
                value={inputValue}
                onInput={onInputChange}
              />
            </FormControl>
          </Stack>
          <FormHelperText error={inputError.isError}>
            {inputError.errorMessage}
          </FormHelperText>
        </Stack>
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
