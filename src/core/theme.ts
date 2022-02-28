import { createTheme as createMuiTheme, PaletteOptions } from "@mui/material";

const LightPalette: PaletteOptions = {
  mode: "light",

  background: {
    default: "#FFFBFE",
  },
};

const DarkPalette: PaletteOptions = {
  mode: "dark",

  background: {
    default: "#1C1B1F",
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
