import { Box, Stack } from "@mui/material";
import type { FC } from "react";
import { Link } from "./Link";

export const Footer: FC = () => {
  return (
    <footer>
      <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
        <Stack
          sx={{ flexDirection: "row", alignItems: "center", columnGap: 2 }}
        >
          <Link
            href={`https://github.com/canoypa/password-generator/releases/tag/v${import.meta.env.APP_VERSION}`}
          >
            v{import.meta.env.APP_VERSION}
          </Link>

          <Link href="https://github.com/canoypa/password-generator">
            GitHub
          </Link>
        </Stack>
      </Box>
    </footer>
  );
};
