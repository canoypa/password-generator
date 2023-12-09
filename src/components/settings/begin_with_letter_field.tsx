import { ListItem, ListItemText, Switch } from "@mui/material";
import { useAtom } from "jotai";
import { beginWithLetterSettingAtom } from "../../core/settings_store";

export const BeginWithLetterField = () => {
  const [beginWithLetter, setBeginWithLetter] = useAtom(
    beginWithLetterSettingAtom
  );

  return (
    <ListItem>
      <ListItemText primary="Begin With Letter" />
      <Switch
        edge="end"
        checked={beginWithLetter ?? true}
        onChange={() => setBeginWithLetter(!beginWithLetter)}
        disabled={beginWithLetter === undefined}
      />
    </ListItem>
  );
};
