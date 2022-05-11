import { hexFromArgb, Scheme } from "@material/material-color-utilities";
import {
  createTheme as createMuiTheme,
  PaletteColor,
  PaletteColorOptions,
  PaletteMode,
  PaletteOptions,
  TypeBackground,
} from "@mui/material";

type M3ColorSchemeKeys =
  | "primary"
  | "primaryContainer"
  | "onPrimary"
  | "onPrimaryContainer"
  | "secondary"
  | "secondaryContainer"
  | "onSecondary"
  | "onSecondaryContainer"
  | "tertiary"
  | "tertiaryContainer"
  | "onTertiary"
  | "onTertiaryContainer"
  | "error"
  | "errorContainer"
  | "onError"
  | "onErrorContainer"
  | "background"
  | "onBackground"
  | "surface"
  | "onSurface"
  | "surfaceVariant"
  | "onSurfaceVariant"
  | "outline"
  | "shadow"
  | "inverseSurface"
  | "inverseOnSurface"
  | "inversePrimary";

// Augmentation MUI theme with Material 3
declare module "@mui/material/styles" {
  interface PaletteOptions {
    primary?: PaletteColorOptions;
    primaryContainer?: PaletteColorOptions;
    onPrimary?: PaletteColorOptions;
    onPrimaryContainer?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    secondaryContainer?: PaletteColorOptions;
    onSecondary?: PaletteColorOptions;
    onSecondaryContainer?: PaletteColorOptions;
    tertiary?: PaletteColorOptions;
    tertiaryContainer?: PaletteColorOptions;
    onTertiary?: PaletteColorOptions;
    onTertiaryContainer?: PaletteColorOptions;
    error?: PaletteColorOptions;
    errorContainer?: PaletteColorOptions;
    onError?: PaletteColorOptions;
    onErrorContainer?: PaletteColorOptions;
    background?: Partial<TypeBackground>;
    onBackground?: PaletteColorOptions;
    surface?: PaletteColorOptions;
    onSurface?: PaletteColorOptions;
    surfaceVariant?: PaletteColorOptions;
    onSurfaceVariant?: PaletteColorOptions;
    outline?: PaletteColorOptions;
    shadow?: PaletteColorOptions;
    inverseSurface?: PaletteColorOptions;
    inverseOnSurface?: PaletteColorOptions;
    inversePrimary?: PaletteColorOptions;
  }

  interface Palette {
    primary: PaletteColor;
    primaryContainer: PaletteColor;
    onPrimary: PaletteColor;
    onPrimaryContainer: PaletteColor;
    secondary: PaletteColor;
    secondaryContainer: PaletteColor;
    onSecondary: PaletteColor;
    onSecondaryContainer: PaletteColor;
    tertiary: PaletteColor;
    tertiaryContainer: PaletteColor;
    onTertiary: PaletteColor;
    onTertiaryContainer: PaletteColor;
    error: PaletteColor;
    errorContainer: PaletteColor;
    onError: PaletteColor;
    onErrorContainer: PaletteColor;
    background: TypeBackground;
    onBackground: PaletteColor;
    surface: PaletteColor;
    onSurface: PaletteColor;
    surfaceVariant: PaletteColor;
    onSurfaceVariant: PaletteColor;
    outline: PaletteColor;
    shadow: PaletteColor;
    inverseSurface: PaletteColor;
    inverseOnSurface: PaletteColor;
    inversePrimary: PaletteColor;
  }
}

const SEED_COLOR = 0x6750a4;

const createPalette = (mode: PaletteMode): PaletteOptions => {
  const scheme =
    mode === "light" ? Scheme.light(SEED_COLOR) : Scheme.dark(SEED_COLOR);

  const options: PaletteOptions = { mode: mode };
  Object.entries(scheme.toJSON()).forEach(([k, v]) => {
    const key = k as M3ColorSchemeKeys;
    const color = hexFromArgb(v);

    if (key === "background") {
      options[key] = { default: color, paper: color };
    } else {
      options[key] = { main: color };
    }
  });

  return options;
};

export const createTheme = (mode: PaletteMode) => {
  return createMuiTheme({
    palette: createPalette(mode),

    components: {
      MuiListSubheader: {
        styleOverrides: {
          root: { backgroundColor: "transparent" },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: "28px" },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: { padding: "24px", paddingBottom: "16px" },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: { padding: "24px", paddingTop: 0 },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: { padding: "24px", paddingTop: 0 },
        },
      },
    },
  });
};
