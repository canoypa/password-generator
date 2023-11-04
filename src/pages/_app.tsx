import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { createTheme } from "../core/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const isLightScheme = useMediaQuery("(prefers-color-scheme:light)");
  const mode = isLightScheme ? "light" : "dark";

  const theme = useMemo(() => createTheme(mode), [mode]);

  return (
    <>
      <Head>
        <meta name="theme-color" content={theme.palette.background.default} />
        <meta name="color-scheme" content="light dark" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
