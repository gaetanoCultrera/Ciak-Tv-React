import { memo, useEffect } from "react";
import { SignUp } from "../../components";
import { Login } from "../../components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Route } from "../../constans/Route";
import { RootState } from "../../store/store";
export const AuthPage = memo(() => {
  const { isLogged } = useSelector(
    ({ objectSignUp }: RootState) => objectSignUp.dataSignup
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate(Route.DASHBOARD);
    }
  });

  return localStorage.getItem("userData") ? <Login /> : <SignUp />;
});
