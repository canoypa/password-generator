import { InputBase, Snackbar, Stack, styled } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { similarChars } from "../core/constant";
import {
  generatePassword,
  GeneratePasswordArgs,
} from "../core/generate_password";
import { useSettings } from "../core/use_settings";
import { FilledTonalButton } from "./Button";

const Output = styled(InputBase)(({ theme }) => ({
  padding: "0 16px",
  height: "56px",
  borderRadius: "4px",
  backgroundColor: theme.palette.surfaceVariant.main,
  fontFamily: "monospace",
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
    if (!settings.length || !settings.includeType) return;

    const options: GeneratePasswordArgs = {
      length: settings.length,
      includeType: settings.includeType,
      excludeChars: similarChars,
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
        <FilledTonalButton fullWidth onClick={generate}>
          Generate
        </FilledTonalButton>
        <FilledTonalButton fullWidth onClick={copy}>
          Copy
        </FilledTonalButton>
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
