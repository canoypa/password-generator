import { Input, ListItem, ListItemText, Slider, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { ChangeEventHandler } from "react";
import { passwordLengthSettingAtom } from "../../core/settings_store";

const LENGTH_MIN = 4;
const LENGTH_MAX = 4096;

export const PasswordLengthSettingField = () => {
  const [length, setLength] = useAtom(passwordLengthSettingAtom);

  const onChange = (newValue: number) => {
    setLength(Math.max(Math.min(newValue, LENGTH_MAX), LENGTH_MIN));
  };

  const onSliderChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue !== "number") return;
    onChange(2 ** newValue);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (Number.isNaN(newValue)) return;

    onChange(newValue);
  };

  return (
    <ListItem>
      <Stack sx={{ flex: 1 }}>
        <ListItemText primary="Password Length" />

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
          <Input
            sx={{ width: "4em" }}
            type="number"
            inputProps={{ min: LENGTH_MIN, max: LENGTH_MAX }}
            value={length ?? 0} // fix uncontrolled warning
            disabled={!length}
            onChange={onInputChange}
          />
        </Stack>
      </Stack>
    </ListItem>
  );
};
