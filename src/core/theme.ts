import { Scheme, hexFromArgb } from "@material/material-color-utilities";
import {
	PaletteColorOptions,
	PaletteMode,
	PaletteOptions,
	experimental_extendTheme as extendTheme,
} from "@mui/material";
import type {} from "@mui/material/themeCssVarsAugmentation";

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

// Custom Button variants
declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		filledTonal: true;
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

export const createTheme = () => {
	return extendTheme({
		colorSchemes: {
			light: { palette: createPalette("light") },
			dark: { palette: createPalette("dark") },
		},

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

			MuiButton: {
				styleOverrides: {
					root: {
						height: "40px",
						minWidth: "48px",
						borderRadius: "20px",
						textTransform: "none",
					},
				},
				variants: [
					{
						props: { variant: "filledTonal" },
						style: ({ theme }) => ({
							padding: "0 24px",
							backgroundColor: theme.vars.palette.secondaryContainer.main,

							"&:hover": {
								backgroundColor: `rgb(${theme.vars.palette.secondaryContainer.mainChannel} / calc(1 - ${theme.vars.palette.action.hoverOpacity}))`,
								boxShadow: theme.shadows[1],
							},
						}),
					},
					{
						props: { variant: "text" },
						style: ({ theme }) => ({
							padding: "0 12px",
							color: theme.vars.palette.primary.main,

							"&:hover": {
								backgroundColor: `rgb(${theme.vars.palette.primary.mainChannel} / calc(1 - ${theme.vars.palette.action.hoverOpacity}))`,
							},
						}),
					},
				],
			},

			MuiSwitch: {
				styleOverrides: {
					root: ({ ownerState, theme }) => ({
						justifyContent: "center",
						padding: 0,
						width: 51,
						height: 32,
						borderRadius: 16,
						border: `2px solid ${theme.vars.palette.outline.main}`,
						backgroundColor: theme.vars.palette.surfaceVariant.main,
						transition: theme.transitions.create(
							["background-color", "border-color"],
							{
								duration: "150ms",
							},
						),

						...(ownerState.checked && {
							borderColor: "transparent",
							backgroundColor: theme.vars.palette.primary.main,
						}),
						...(ownerState.disabled && {
							opacity: 0.3,
						}),
					}),
					switchBase: () => ({
						position: "relative",
						top: -6,
						padding: 0,
						width: 40,
						height: 40,
						transform: "translateX(-10px)",
						"&.Mui-checked": {
							transform: "translateX(10px)",
						},
					}),
					track: {
						display: "none",
					},
					thumb: ({ ownerState, theme }) => ({
						width: 16,
						height: 16,
						boxShadow: "none",
						backgroundColor: theme.vars.palette.outline.main,
						transition: theme.transitions.create(
							["transform", "background-color"],
							{
								duration: "150ms",
							},
						),

						// ...(ownerState && {
						//   backgroundColor: theme.palette.onPrimary.main,
						//   transform: "scale(1.5)",
						// }),
						...(ownerState.checked && {
							backgroundColor: theme.vars.palette.onPrimary.main,
							transform: "scale(1.5)",
						}),
						...(ownerState.disabled && {
							opacity: 0.3,
						}),
					}),
				},
			},
		},
	});
};
