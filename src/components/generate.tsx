import { ButtonBase, InputBase, Snackbar, Stack, styled } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import {
  generatePassword,
  GeneratePasswordArgs,
} from "../core/generate_password";
import { useSettings } from "../core/use_settings";

const Output = styled(InputBase)(({ theme }) => ({
  padding: "0 16px",
  height: "56px",
  borderRadius: "4px",
  backgroundColor: theme.palette.mode === "dark" ? "#49454F" : "#E7E0EC",
}));

const FilledTonalButton = styled(ButtonBase)(({ theme }) => ({
  padding: "0 24px",
  height: "40px",
  width: "100%",
  borderRadius: "40px",
  backgroundColor: theme.palette.mode === "dark" ? "#4A4458" : "#E8DEF8",
}));

type CopiedSnackbarState = {
  key: number;
  open: boolean;
};
const DefaultCopiedSnackbarState: CopiedSnackbarState = {
  key: 0,
  open: false,
};

export const Generate: FC = () => {
  const settings = useSettings();

  const [password, setPassword] = useState<string>("");

  const [copiedSnackState, setCopiedSnackState] = useState<CopiedSnackbarState>(
    DefaultCopiedSnackbarState
  );

  const generate = useCallback(() => {
    const options: GeneratePasswordArgs = {
      length: settings.length,
      includeType: settings.includeType,
    };

    const password = generatePassword(options);
    setPassword(password);
  }, [settings]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(password);

    setCopiedSnackState({ key: Date.now(), open: true });
  }, [password]);

  const onCloseSnackbar = useCallback(() => {
    setCopiedSnackState(DefaultCopiedSnackbarState);
  }, []);

  // re-generate password when first mount or update settings
  useEffect(() => generate(), [generate, settings]);

  return (
    <Stack spacing={3}>
      <Output value={password} readOnly />

      <Stack direction="row" spacing={2}>
        <FilledTonalButton onClick={generate}>Generate</FilledTonalButton>
        <FilledTonalButton onClick={copy}>Copy</FilledTonalButton>
      </Stack>

      <Snackbar
        key={copiedSnackState.key}
        open={copiedSnackState.open}
        onClose={onCloseSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        message="Copied to clipboard!"
      />
    </Stack>
  );
};
