import { useEffect, useMemo } from "react";
import { Container, CssBaseline } from "@mui/material";
import "./App.css";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IFormAuth } from "./interfaces/IFormAuth";
import { updateObjectAuth } from "./store/signupSlice";
import { Navbar } from "./components/index";
import { Route } from "./constans/Route";
import { handleLocalStorageReload } from "./store/favoriteSlice";
import { CustomDataCardMovieById } from "./interfaces/IResponseMovieById";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderNavbar = useMemo(
    () => pathname !== Route.BASE && <Navbar />,
    [pathname]
  );
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { isLogged } = JSON.parse(userData) as IFormAuth;
      dispatch(updateObjectAuth(JSON.parse(userData) as IFormAuth));
      if (isLogged) {
        dispatch(updateObjectAuth(JSON.parse(userData) as IFormAuth));
        return;
      }
    }
    navigate(Route.BASE);
  }, [dispatch, navigate]);

  useEffect(() => {
    const favoriteList = localStorage.getItem("favoriteItem");
    if (favoriteList) {
      const parsedFavoriteList = JSON.parse(
        favoriteList
      ) as CustomDataCardMovieById[];
      if (parsedFavoriteList.length) {
        dispatch(handleLocalStorageReload(parsedFavoriteList));
        return;
      }
      navigate(Route.DASHBOARD);
    }
  }, [dispatch, navigate]);

  return (
    <>
      <CssBaseline />
      {/* Main container */}
      {renderNavbar}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
