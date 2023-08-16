import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { IFormAuth } from "../../interfaces/IFormAuth";
import { CustomButton } from "../index";
import { useHandleOnSubmit } from "./utils/useHandleOnSubmit";
import { useValidationSchema } from "./validation/useValidationSchema";

export const Login = () => {
  const handleOnSubmit = useHandleOnSubmit();
  const handleValidation = useValidationSchema();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    values,
    touched,
    errors,
  } = useFormik<Pick<IFormAuth, "email" | "password">>({
    isInitialValid: false,
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: handleValidation,
    onSubmit: handleOnSubmit,
  });

  const renderButton = useMemo(
    //TODO useState per isValid disabilitare anche all'init del compoinente
    () => (
      <CustomButton
        data-testid="customButton"
        optionValue={"Login"}
        disabled={!isValid}
      />
    ),
    [isValid]
  );

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} padding={5}>
        <Card sx={{ maxWidth: "800" }}>
          <CardMedia
            data-testid="customImg"
            component="img"
            height="190"
            image="https://themetrust.com/wp-content/uploads/2018/04/custom_login_cover.jpg"
            alt="Login"
          />
          <CardContent>
            <Box padding={4} display={"flex"} justifyContent={"center"}>
              <Typography
                data-testid="title"
                color={"red"}
                fontWeight={"bold"}
                variant="h3"
              >
                Login Form
              </Typography>
            </Box>
            <form onSubmit={handleSubmit} data-testid="invalid-form">
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  fullWidth
                  required
                  aria-label="email"
                  id="email"
                  name="email"
                  label="Email"
                  inputProps={{ "data-testid": "email" }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  required
                  aria-label="password"
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  inputProps={{ "data-testid": "password" }}
                  value={values.password}
                  onChange={handleChange}
                  //quando perde il focus
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: 4 }}
                />
              </Stack>
              {renderButton}
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
