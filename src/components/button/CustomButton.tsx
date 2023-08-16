import { Button } from "@mui/material";
import { FC, memo } from "react";

export interface CustomOption {
  optionValue: string;
  disabled?: boolean;
  setAccount?: () => void;
}

export const CustomButton: FC<CustomOption> = memo(
  ({ optionValue, disabled, setAccount }) => {
    return (
      <Button
        data-testid="customButton"
        onClick={setAccount}
        sx={{ mt: 1, mr: 1 }}
        type="submit"
        disabled={disabled}
      >
        {optionValue}
      </Button>
    );
  }
);
