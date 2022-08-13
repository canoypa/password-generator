import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Logo } from "./logo";

export const Hero: FC = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Logo sx={{ fontSize: 64 }} />
      <Typography variant="h5">Password Generator</Typography>
    </Stack>
  );
};
