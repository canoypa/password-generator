import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Link } from "./Link";

export const Footer: FC = () => {
  return (
    <footer>
      <Box display="flex" justifyContent="center" px={2}>
        <Stack direction="row" alignItems="center" columnGap={2}>
          <Link
            href={`https://github.com/canoypa/password-generator/releases/tag/v${process.env.APP_VERSION}`}
          >
            v{process.env.APP_VERSION}
          </Link>

          <Link href="https://github.com/canoypa/password-generator">
            GitHub
          </Link>
        </Stack>
      </Box>
    </footer>
  );
};
