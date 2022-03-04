import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
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

  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          site_name: "Password Generator",
          images: [
            { url: "https://password.tepbyte.dev/icons/icon-512-maskable.png" },
          ],
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <RecoilRoot>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={isLightScheme ? lightTheme : darkTheme}>
            <CssBaseline />

            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
