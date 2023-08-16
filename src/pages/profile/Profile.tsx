import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resetState, updateObjectAuth } from "../../store/signupSlice";
import { Route } from "../../constans/Route";
import { CustomButton, ModalProfile } from "../../components";

export const Profile = () => {
  const dataUser = useSelector(
    ({ objectSignUp }: RootState) => objectSignUp.dataSignup
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = useCallback((): void => {
    setIsOpen(true);
  }, []);
  // Event handler for closing the modal
  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const setLogout = useCallback(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...dataUser, isLogged: false })
    );
    dispatch(updateObjectAuth({ ...dataUser, isLogged: false }));
    navigate(Route.BASE);
  }, [dataUser, dispatch, navigate]);

  const deleteAccount = useCallback(() => {
    if (window.confirm("Are you sure to delete account?")) {
      localStorage.clear();
      dispatch(resetState());
      navigate(Route.BASE);
    }
  }, [dispatch, navigate]);

  const renderModal = useMemo(
    () => (isOpen ? <ModalProfile setHandleClose={handleClose} /> : null),
    [handleClose, isOpen]
  );

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} padding={5}>
        <Card sx={{ maxWidth: "800" }}>
          <CardMedia
            component="img"
            height="170"
            image="https://cdn1.vectorstock.com/i/1000x1000/29/95/grunge-red-settings-word-with-gear-or-cogwheel-vector-37022995.jpg1"
            alt="Login"
          />

          <CardContent>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                padding={3}
                color={"red"}
                fontWeight={"bold"}
                variant="h3"
              >
                Hello {dataUser.username}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                padding={3}
                color={"red"}
                fontWeight={"bold"}
                variant="h6"
              >
                {dataUser.email}
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <CustomButton optionValue="Logout" setAccount={setLogout} />
              <CustomButton
                optionValue="Change Password"
                setAccount={handleOpen}
              />
              <CustomButton
                optionValue="Delete Account"
                setAccount={deleteAccount}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {renderModal}
    </>
  );
};
