import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Link } from "./Link";

export const Footer: FC = () => {
  return (
    <footer>
      <Box display="flex" justifyContent="center" px={2}>
        <Stack direction="row" spacing={2}>
          <Link href="https://github.com/canoypa/password-generator">
            GitHub
          </Link>
        </Stack>
      </Box>
    </footer>
  );
};
