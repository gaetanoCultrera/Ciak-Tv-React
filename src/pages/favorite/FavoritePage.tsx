import { useMemo, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Route } from "../../constans/Route";
import { resetState } from "../../store/favoriteSlice";
import { ContentCard } from "../../components/card/contentCard/ContentCard";
import { scrollStyle } from "../../components/style/GlobalStyle";

export const FavoritePage = () => {
  const dataFavoriteList = useSelector(
    ({ favoriteItems }: RootState) => favoriteItems.favoriteList
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteItemFromFavorite = useCallback(() => {
    if (window.confirm("Are you sure to delete all favorite?")) {
      localStorage.removeItem("favoriteItem");
      dispatch(resetState());
      navigate(Route.DASHBOARD);
    }
  }, [dispatch, navigate]);

  const renderTitle = useMemo(
    () =>
      dataFavoriteList.length ? (
        <>
          <Typography
            padding={3}
            color={"black"}
            fontWeight={"bold"}
            variant="h3"
            sx={{
              textShadow:
                "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white",
            }}
          >
            My Favorite List
          </Typography>
          <Button onClick={deleteItemFromFavorite}>Scoop out</Button>
        </>
      ) : (
        <Typography
          padding={3}
          color={"black"}
          fontWeight={"bold"}
          variant="h4"
        >
          No Elements
        </Typography>
      ),
    [dataFavoriteList.length, deleteItemFromFavorite]
  );

  const renderResponse = useMemo(
    () =>
      dataFavoriteList.map(({ id, title, poster_path }) => (
        <ContentCard key={id} id={id} poster_path={poster_path} title={title} />
      )),
    [dataFavoriteList]
  );

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        {renderTitle}
      </Box>
      <Box sx={scrollStyle}>{renderResponse}</Box>
    </>
  );
};
