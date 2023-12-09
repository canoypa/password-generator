import { Chip, ListItem, ListItemText, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { CharType, CharTypeLabel } from "../../core/constant";
import { SettingIncludeTypesKeys } from "../../core/settings";
import { includeTypesSettingAtom } from "../../core/settings_store";

export const IncludeTypesField = () => {
  const [types, setTypes] = useAtom(includeTypesSettingAtom);

  const toggle = (type: CharType) => {
    return () => {
      if (!types) return;

      // if true is only one, noop
      if (types[type] && Object.values(types).filter(Boolean).length === 1) {
        return;
      }

      setTypes({ ...types, [type]: !types[type] });
    };
  };

  return (
    <ListItem>
      <Stack>
        <ListItemText primary="Include Characters" />
        <Stack direction="row" spacing={1} mt={1}>
          {SettingIncludeTypesKeys.map((type) => {
            return (
              <Chip
                key={type}
                label={CharTypeLabel[type]}
                size="small"
                variant="outlined"
                // instead of selected
                color={types?.[type] ? "primary" : "default"}
                disabled={!types}
                onClick={toggle(type)}
              />
            );
          })}
        </Stack>
      </Stack>
    </ListItem>
  );
};
