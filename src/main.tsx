import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { createTheme } from "./core/theme";

const theme = createTheme();

// biome-ignore lint/style/noNonNullAssertion: root element always exists
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>
);
