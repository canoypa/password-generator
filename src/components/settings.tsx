import { List, ListSubheader } from "@mui/material";
import { FC } from "react";
import { BeginWithLetterField } from "./settings/begin_with_letter_field";
import { ExcludeSpecifyCharsField } from "./settings/exclude_specify_chars_field";
import { IncludeTypesField } from "./settings/include_types_field";
import { PasswordLengthSettingField } from "./settings/password_length_field";

export const Settings: FC = () => {
  return (
    <List subheader={<ListSubheader>Settings</ListSubheader>}>
      <PasswordLengthSettingField />
      <IncludeTypesField />
      <BeginWithLetterField />
      <ExcludeSpecifyCharsField />
    </List>
  );
};
