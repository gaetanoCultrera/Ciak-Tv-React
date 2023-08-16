import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { updateObjectAuth } from "../../../store/signupSlice";
import { Route } from "../../../constans/Route";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

//ritorno della useCallback dell'effitivo contenuto del componente
export const useHandleOnSubmit = () => {
  const { email, password, username } = useSelector(
    ({ objectSignUp }: RootState) => objectSignUp.dataSignup
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useCallback(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({ email, password, username, isLogged: true })
    );
    dispatch(updateObjectAuth({ email, password, username, isLogged: true }));
    navigate(Route.DASHBOARD);
  }, [email, password, username, dispatch, navigate]);
};
