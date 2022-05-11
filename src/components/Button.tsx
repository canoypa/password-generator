import {
  alpha,
  ButtonBase as MuiButtonBase,
  darken,
  styled,
} from "@mui/material";

type ButtonProps = {
  fullWidth?: boolean;
};

const ButtonBase = styled(MuiButtonBase, {
  shouldForwardProp: (props) => props !== "variant" && props !== "fullWidth",
})<ButtonProps>(({ theme, ...props }) => ({
  ...theme.typography.button,
  textTransform: "none",

  height: "40px",
  minWidth: "48px",
  borderRadius: "20px",
  transitionDuration: "150ms",
  transitionProperty: "box-shadow",
  transitionTimingFunction: theme.transitions.easing.easeInOut,

  ...(props.fullWidth && {
    width: "100%",
  }),
}));

export const FilledTonalButton = styled(ButtonBase)(({ theme }) => ({
  padding: "0 24px",
  backgroundColor: theme.palette.secondaryContainer.main,

  "&:hover": {
    backgroundColor: darken(
      theme.palette.secondaryContainer.main,
      theme.palette.action.hoverOpacity
    ),
    boxShadow: theme.shadows[1],
  },

  "&:focus": {
    backgroundColor: darken(
      theme.palette.secondaryContainer.main,
      theme.palette.action.focusOpacity
    ),
  },
}));

export const TextButton = styled(ButtonBase)(({ theme }) => ({
  padding: "0 12px",
  color: theme.palette.primary.main,

  "&:hover": {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.hoverOpacity
    ),
  },

  "&:focus": {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.focusOpacity
    ),
  },
}));
