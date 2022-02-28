import { ButtonBase, Stack, styled } from "@mui/material";
import { FC } from "react";

const Output = styled("div")(({ theme }) => ({
  padding: "0 16px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  borderRadius: "4px",
  backgroundColor: theme.palette.mode === "dark" ? "#49454F" : "#E7E0EC",
}));

const FilledTonalButton = styled(ButtonBase)(({ theme }) => ({
  padding: "0 24px",
  height: "40px",
  width: "100%",
  borderRadius: "40px",
  backgroundColor: theme.palette.mode === "dark" ? "#4A4458" : "#E8DEF8",
}));

export const Generate: FC = () => {
  return (
    <Stack spacing={3}>
      <Output>{"todo"}</Output>

      <Stack direction="row" spacing={2}>
        <FilledTonalButton>Generate</FilledTonalButton>
        <FilledTonalButton>Copy</FilledTonalButton>
      </Stack>
    </Stack>
  );
};
