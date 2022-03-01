import { Box, Stack } from "@mui/material";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Footer } from "../components/footer";
import { Generate } from "../components/generate";
import { Hero } from "../components/hero";
import { Settings } from "../components/settings";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Password Generator"
        description="Generate secure password simply and quickly."
      />

      <Stack mx="auto" py={3} maxWidth="sm" spacing={8}>
        <Hero />

        <Box px={3}>
          <Generate />
        </Box>

        <Settings />

        <Footer />
      </Stack>
    </>
  );
};

export default Home;
