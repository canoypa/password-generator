import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { createEmotionCache } from "../core/emotionCache";
import { darkTheme, lightTheme } from "../core/theme";

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

function MyApp({
  Component,
  pageProps,
  emotionCache = createEmotionCache(),
}: MyAppProps) {
  const isLightScheme = useMediaQuery("(prefers-color-scheme:light)");
  const theme = useMemo(
    () => (isLightScheme ? lightTheme : darkTheme),
    [isLightScheme]
  );

  return (
    <>
      <Head>
        <meta name="theme-color" content={theme.palette.background.default} />
      </Head>

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
export default MyApp;
