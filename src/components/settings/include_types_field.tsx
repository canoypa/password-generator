import { ListItemButton, ListItemText } from "@mui/material";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CharTypeLabel } from "../../core/constant";
import {
  SettingIncludeTypes,
  SettingIncludeTypesKeys,
} from "../../core/settings";
import { includeTypesSettingAtom } from "../../core/settings_store";

const IncludeTypeDialog = dynamic(() => import("./include_type_dialog"));

const getIncludeTypesLabel = (types: SettingIncludeTypes): string => {
  return SettingIncludeTypesKeys.reduce<string[]>((pre, type) => {
    if (types[type]) return [...pre, CharTypeLabel[type]];
    return pre;
  }, []).join(", ");
};

export const IncludeTypesField = () => {
  const [types, setTypes] = useAtom(includeTypesSettingAtom);
  const [typesOpen, setTypesOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setTypesOpen(true)}>
        <ListItemText
          primary="Include Characters"
          secondary={types ? getIncludeTypesLabel(types) : "..."}
        />
      </ListItemButton>

      {types && (
        <IncludeTypeDialog
          open={typesOpen}
          onSubmit={(v) => setTypes(v)}
          onClose={() => setTypesOpen(false)}
          value={types}
        />
      )}
    </>
  );
};
