import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  length: number;
};

type FragmentProps = {
  onSubmit: (newValue: number) => void;
  onClose: () => void;
  value: number;
};
export const PasswordLengthFragment: FC<FragmentProps> = ({
  onSubmit,
  onClose,
  value,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { length: value },
  });

  const submit: SubmitHandler<FormData> = (data) => {
    onSubmit(data.length);
    onClose();
  };

  return (
    <>
      <DialogTitle>Password Length</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            {...register("length", {
              valueAsNumber: true,
              min: 4,
              max: 4096,
            })}
            variant="standard"
            type="number"
            autoFocus
            fullWidth
            error={!!errors.length}
            helperText={
              errors.length?.type === "min"
                ? "Minimum length is 4."
                : errors.length?.type === "max"
                ? "Maximum length is 4096."
                : ""
            }
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmit(submit)}>Ok</Button>
      </DialogActions>
    </>
  );
};

type DialogProps = {
  open: boolean;
} & FragmentProps;
export const PasswordLengthDialog: FC<DialogProps> = ({
  open,
  onSubmit,
  onClose,
  value,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <PasswordLengthFragment
        onClose={onClose}
        onSubmit={onSubmit}
        value={value}
      />
    </Dialog>
  );
};
