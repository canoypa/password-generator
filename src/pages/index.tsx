import { Box, Stack } from "@mui/material";
import type { NextPage } from "next";
import { Footer } from "../components/footer";
import { Generate } from "../components/generate";
import { Hero } from "../components/hero";
import { Settings } from "../components/settings";

const Home: NextPage = () => {
  return (
    <Stack mx="auto" py={3} maxWidth="sm" spacing={8}>
      <Hero />

      <Box px={3}>
        <Generate />
      </Box>

      <Settings />

      <Footer />
    </Stack>
  );
};

export default Home;
