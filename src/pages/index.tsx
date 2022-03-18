import { Box, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/footer";
import { Generate } from "../components/generate";
import { Hero } from "../components/hero";
import { Settings } from "../components/settings";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Password Generator</title>
        <meta
          name="description"
          content="Generate secure password simply and quickly."
        />

        <link rel="canonical" href="https://password.tepbyte.dev/" />

        <meta property="og:url" content="https://password.tepbyte.dev/" />
        <meta property="og:title" content="Password Generator" />
        <meta
          property="og:description"
          content="Generate secure password simply and quickly."
        />
      </Head>

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
