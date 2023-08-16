import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateObjectAuth } from "../../../store/signupSlice";
import { FormikState } from "formik";
import { IFormProfile } from "../../../interfaces/IFormAuth";

export interface OnSubmitProp {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            oldPassword: string;
            newPassword: string;
            confirmPassword: string;
          }>
        >
      | undefined
  ) => void;
}

export const useHandleProfile = (setHandleClose: () => void) => {
  const dataUser = useSelector(
    ({ objectSignUp }: RootState) => objectSignUp.dataSignup
  );

  const dispatch = useDispatch();

  return useCallback(
    (
      { newPassword }: Pick<IFormProfile, "newPassword">,
      { setSubmitting, resetForm }: OnSubmitProp
    ) => {
      if (window.confirm("Are you sure to change password?")) {
        setSubmitting(true);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...dataUser,
            password: newPassword,
          })
        );
        dispatch(updateObjectAuth({ ...dataUser, password: newPassword }));
        setSubmitting(false);
        resetForm();
        setHandleClose();
      }
    },
    [dataUser, dispatch, setHandleClose]
  );
};
