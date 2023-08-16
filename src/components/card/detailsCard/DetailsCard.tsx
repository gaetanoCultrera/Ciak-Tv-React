import { memo, FC, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataListFavorite,
  removeDataListFavorite,
} from "../../../store/favoriteSlice";
import { RootState } from "../../../store/store";
import { CustomDataCardMovieById } from "../../../interfaces/IResponseMovieById";
import {
  Box,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { detailsCardBoxStyle } from "./style";
import {
  typographyStyle,
  contentCardStyle,
  cardBoxStyle,
} from "../../style/GlobalStyle";
import { CustomFavoriteIcon } from "../../icon/CustomFavoriteIcon";

export const DetailsCard: FC<CustomDataCardMovieById> = memo((props) => {
  const dispatch = useDispatch();
  const {
    id,
    backdrop_path,
    title,
    overview,
    vote_average,
    poster_path,
    genres,
    isFavorite,
  } = props;

  const dataFavoriteList = useSelector(
    ({ favoriteItems }: RootState) => favoriteItems.favoriteList
  );
  const renderGenres = useMemo(
    () =>
      genres.map(({ id, name }) => (
        <Typography
          key={id}
          sx={typographyStyle}
          color={"red"}
          gutterBottom
          variant="h5"
        >
          {name}
        </Typography>
      )),
    [genres]
  );
  const handleFavorite = useCallback(() => {
    const indexFavorite = dataFavoriteList.findIndex((item) => item.id === id);
    if (indexFavorite !== -1) {
      if (window.confirm("Are you sure to delete from favorite?")) {
        dispatch(removeDataListFavorite(indexFavorite));
        localStorage.setItem(
          "favoriteItem",
          JSON.stringify(
            dataFavoriteList.filter((movie) => movie.id !== props.id)
          )
        );
      }
      return;
    }
    dispatch(addDataListFavorite({ ...props, isFavorite: true }));
    localStorage.setItem(
      "favoriteItem",
      JSON.stringify([...dataFavoriteList, { ...props, isFavorite: true }])
    );
    alert("item inserted correctly");
  }, [dataFavoriteList, dispatch, id, props]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Box
      sx={{
        ...detailsCardBoxStyle,
        backgroundImage: `${
          poster_path
            ? `url(http://image.tmdb.org/t/p/original/${backdrop_path})`
            : `url(https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png)`
        }`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <CardContent sx={{ ...contentCardStyle, width: "60%" }}>
          <Typography
            sx={typographyStyle}
            fontWeight={"bold"}
            color={"red"}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography sx={typographyStyle} gutterBottom variant="h5">
            {overview}
          </Typography>
          <Box sx={cardBoxStyle}>
            <Typography
              sx={typographyStyle}
              color={"red"}
              gutterBottom
              variant="h5"
            >
              Vote Average: {Math.round(vote_average)}
            </Typography>
          </Box>
          {renderGenres}
          <CardActions disableSpacing>
            <IconButton onClick={handleFavorite} aria-label="add to favorites">
              <CustomFavoriteIcon isFavorite={isFavorite} />
            </IconButton>
          </CardActions>
        </CardContent>
      </Box>
    </Box>
  );
});
