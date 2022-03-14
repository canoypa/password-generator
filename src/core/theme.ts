import {
  createTheme as createMuiTheme,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    secondaryContainer?: PaletteColorOptions;
    surfaceVariant?: PaletteColorOptions;
  }

  interface Palette {
    secondaryContainer: PaletteColor;
    surfaceVariant: PaletteColor;
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
          root: {
            backgroundColor: "transparent",
          },
        },
      },
    },
  });
};

export const lightTheme = createTheme(LightPalette);
export const darkTheme = createTheme(DarkPalette);
