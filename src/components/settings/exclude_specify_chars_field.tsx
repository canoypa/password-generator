import { ListItem, ListItemText, Switch } from "@mui/material";
import { useAtom } from "jotai";
import { similarChars } from "../../core/constant";
import { excludeSpecifyCharsSettingAtom } from "../../core/settings_store";

export const ExcludeSpecifyCharsField = () => {
  const [excludeSpecifyChars, setExcludeSpecifyChars] = useAtom(
    excludeSpecifyCharsSettingAtom
  );

  return (
    <ListItem>
      <ListItemText primary="Exclude Similar Chars" />
      <Switch
        edge="end"
        checked={excludeSpecifyChars?.enabled ?? true}
        onChange={() =>
          setExcludeSpecifyChars({
            enabled: !excludeSpecifyChars?.enabled,
            chars: similarChars,
          })
        }
        disabled={excludeSpecifyChars === undefined}
      />
    </ListItem>
  );
};
