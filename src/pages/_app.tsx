import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { darkTheme, lightTheme } from "../core/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const isDarkScheme = useMediaQuery("(prefers-color-scheme:dark)");

  return (
    <RecoilRoot>
      <ThemeProvider theme={isDarkScheme ? darkTheme : lightTheme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default MyApp;
