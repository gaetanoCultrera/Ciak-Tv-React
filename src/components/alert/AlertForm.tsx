import { memo } from "react";
import { Alert } from "@mui/material";

interface AlertFormProps {
  message: string;
}

export const AlertForm = memo(({ message }: AlertFormProps) => {
  return (
    <Alert data-testid="customAlert" severity="error">
      {message}
    </Alert>
  );
});
