import {
  FormControl,
  FormHelperText,
  Input,
  ListItem,
  ListItemText,
  Slider,
  Stack,
} from "@mui/material";
import { useAtom } from "jotai";
import { ChangeEventHandler, useCallback, useState } from "react";
import { passwordLengthSettingAtom } from "../../core/settings_store";

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

export const PasswordLengthSettingField = () => {
  const [length, setLength] = useAtom(passwordLengthSettingAtom);

  const [inputError, setInputError] = useState<InputError>({ isError: false });

  const onChange = useCallback((newValue: number) => {
    if (Number.isNaN(newValue))
      setInputError({ isError: true, errorMessage: "Invalid number." });
    else if (newValue < min)
      setInputError({ isError: true, errorMessage: `Min value is ${min}.` });
    else if (newValue > max)
      setInputError({ isError: true, errorMessage: `Max value is ${max}.` });
    else setInputError({ isError: false });

    if (!Number.isNaN(newValue)) {
      setLength(newValue);
    }
  }, []);

  const onSliderChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue !== "number") {
        throw new Error("newValue is not a number");
      }

      onChange(2 ** newValue);
    },
    []
  );

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const newValue = parseInt(e.target.value, 10);
      onChange(newValue);
    },
    []
  );

  return (
    <ListItem>
      <Stack sx={{ flex: 1 }}>
        <ListItemText primary="Password Length" />
        <Stack>
          <Stack direction="row" spacing={2} mt={1}>
            <Slider
              min={2}
              max={5}
              size="small"
              step={1}
              marks
              value={Math.log(length ?? 0) / Math.log(2)}
              scale={(v) => 2 ** v}
              disabled={!length}
              onChange={onSliderChange}
            />
            <FormControl error={inputError.isError}>
              <Input
                sx={{ width: "4em" }}
                error={inputError.isError}
                type="number"
                inputProps={{ min, max }}
                value={length}
                disabled={!length}
                onInput={onInputChange}
              />
            </FormControl>
          </Stack>
          <FormHelperText error={inputError.isError}>
            {inputError.errorMessage}
          </FormHelperText>
        </Stack>
      </Stack>
    </ListItem>
  );
};
