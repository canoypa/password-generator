import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { darkTheme, lightTheme } from "../core/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const isDarkScheme = useMediaQuery("(prefers-color-scheme:dark)");

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
        <ThemeProvider theme={isDarkScheme ? darkTheme : lightTheme}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
