import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createTheme } from "../core/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme();

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={theme.colorSchemes.dark.palette.background.default}
        />
        <meta name="color-scheme" content="light dark" />
      </Head>

      <CssVarsProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </CssVarsProvider>
    </>
  );
}
export default MyApp;
