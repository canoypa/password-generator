import {
  createTheme as createMuiTheme,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
  TypeBackground,
} from "@mui/material";

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

const LightPalette: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#6750A4",
  },
  secondaryContainer: {
    main: "#E8DEF8",
  },
  surfaceVariant: {
    main: "#E7E0EC",
  },

  background: {
    default: "#FFFBFE",
    paper: "#FFFBFE",
  },
};

const DarkPalette: PaletteOptions = {
  mode: "dark",

  primary: {
    main: "#D0BCFF",
  },
  secondaryContainer: {
    main: "#4A4458",
  },
  surfaceVariant: {
    main: "#49454F",
  },

  background: {
    default: "#1C1B1F",
    paper: "#1C1B1F",
  },
};

const createTheme = (palette: PaletteOptions) => {
  return createMuiTheme({
    palette: palette,

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

export const lightTheme = createTheme(LightPalette);
export const darkTheme = createTheme(DarkPalette);
