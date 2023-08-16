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
import { useHandleSignUp } from "./utils/useHandleSignUp";
import { validationSchema } from "./validation/ValidationSchema";

export const SignUp = () => {
  const handleSignUp = useHandleSignUp();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    values,
    touched,
    errors,
  } = useFormik<Omit<IFormAuth, "isLogged">>({
    isInitialValid: false,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: handleSignUp,
  });

  const renderButton = useMemo(
    () => (
      <CustomButton
        data-testid="customButton"
        optionValue={"SignUp"}
        disabled={!isValid}
      />
    ),
    [isValid]
  );

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} padding={5}>
        <Card sx={{ width: "80%" }}>
          <CardMedia
            data-testid="customImg"
            component="img"
            height="140"
            image="https://www.fwisd.org/cms/lib/TX01918778/Centricity/Domain/6965/2023-Register.png"
            alt="register"
          />
          <CardContent>
            <Box padding={4} display={"flex"} justifyContent={"center"}>
              <Typography
                data-testid="title"
                color={"red"}
                fontWeight={"bold"}
                variant="h3"
              >
                Register Form
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  fullWidth
                  required
                  aria-label="username"
                  id="username"
                  name="username"
                  label="Username"
                  inputProps={{ "data-testid": "username" }}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
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
              </Stack>
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
              <TextField
                fullWidth
                required
                aria-label="confirmPassword"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                inputProps={{ "data-testid": "confirmPassword" }}
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ mb: 4 }}
              />
              {renderButton}
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
