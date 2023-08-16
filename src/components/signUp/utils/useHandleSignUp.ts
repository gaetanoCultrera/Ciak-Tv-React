import { useCallback } from "react";
import { IFormAuth } from "../../../interfaces/IFormAuth";
import { useNavigate } from "react-router-dom";
import { updateObjectAuth } from "../../../store/signupSlice";
import { Route } from "../../../constans/Route";
import { useDispatch } from "react-redux";

export const useHandleSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useCallback(
    ({ email, password, username }: Omit<IFormAuth, "isLogged">) => {
      localStorage.setItem(
        "userData",
        JSON.stringify({ email, password, username, isLogged: true })
      );
      dispatch(updateObjectAuth({ email, password, username, isLogged: true }));
      navigate(Route.DASHBOARD);
    },
    [dispatch, navigate]
  );
};
