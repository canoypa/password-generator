import { Box, Stack } from "@mui/material";
import { Footer } from "./components/footer";
import { Generate } from "./components/generate";
import { Hero } from "./components/hero";
import { Settings } from "./components/settings";

export const App = () => {
  return (
    <Stack sx={{ mx: "auto", py: 3, maxWidth: "sm", rowGap: 8 }}>
      <Hero />

      <Box sx={{ px: 3 }}>
        <Generate />
      </Box>

      <Settings />

      <Footer />
    </Stack>
  );
};
