import { FC } from "react";
import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CustomButton } from "..";
import { AlertForm } from "../alert/AlertForm";
import { useValidationProfileSchema } from "./validation/useValidationProfileSchema";
import { useHandleProfile } from "./utils/useHandleProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
};

export interface ModalProp {
  setHandleClose: () => void;
}

export const ModalProfile: FC<ModalProp> = ({ setHandleClose }) => {
  const handleSetProfile = useHandleProfile(setHandleClose);
  const handleValidation = useValidationProfileSchema();

  return (
    <>
      <Modal
        open
        onClose={setHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} maxWidth="sm">
          <Typography
            data-testid="title"
            padding={3}
            color={"red"}
            fontWeight={"bold"}
            variant="h3"
          >
            Change Password!
          </Typography>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            isInitialValid={false}
            validationSchema={handleValidation}
            validateOnMount
            onSubmit={handleSetProfile}
          >
            {({ isValid }) => (
              <Form>
                <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                  <Field
                    as={TextField}
                    aria-label="oldPassword"
                    inputProps={{ "data-testid": "oldPassword" }}
                    name="oldPassword"
                    placeholder="old password"
                    type="password"
                  />
                  <ErrorMessage name="oldPassword">
                    {(msg) => <AlertForm message={msg} />}
                  </ErrorMessage>
                  <Field
                    as={TextField}
                    aria-label="newPassword"
                    inputProps={{ "data-testid": "newPassword" }}
                    name="newPassword"
                    placeholder="new password"
                    type="password"
                  />
                  <ErrorMessage name="newPassword">
                    {(msg) => <AlertForm message={msg} />}
                  </ErrorMessage>
                  <Field
                    as={TextField}
                    aria-label="confirmPassword"
                    inputProps={{ "data-testid": "confirmPassword" }}
                    name="confirmPassword"
                    placeholder="confirm Password"
                    type="password"
                  />
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <AlertForm message={msg} />}
                  </ErrorMessage>
                </Stack>
                <CustomButton
                  data-testid="customButton"
                  optionValue={"SignUp"}
                  disabled={!isValid}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};
