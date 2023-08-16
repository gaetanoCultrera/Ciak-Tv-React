import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetUpcomingMoviesByIdQuery } from "../../services/film";
import { DetailsCard } from "../../components/card/detailsCard/DetailsCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type DetailsId = {
  movieId: string;
};

export type customError = {
  status_message: string;
};

export const DetailsPage = () => {
  const { movieId } = useParams<DetailsId>() as DetailsId;
  const { data, error, isLoading } = useGetUpcomingMoviesByIdQuery(movieId);

  const isFavorite = useSelector(({ favoriteItems }: RootState) => {
    return favoriteItems.favoriteList.some(({ id }) => id === movieId);
  });

  const isFetchBaseQueryError = (
    errorValue: unknown
  ): errorValue is FetchBaseQueryError => {
    return (errorValue as FetchBaseQueryError).data !== undefined;
  };

  const renderResponse = useMemo(() => {
    if (isLoading) {
      return (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      if (isFetchBaseQueryError(error)) {
        return (
          <Box display={"flex"} justifyContent={"center"}>
            <Typography color="red" variant="h5">
              {(error.data as customError).status_message}
            </Typography>
          </Box>
        );
      }
    }
    return (
      data && (
        <DetailsCard
          key={data.id}
          id={movieId}
          title={data.title}
          overview={data.overview}
          poster_path={data.poster_path}
          backdrop_path={data.backdrop_path}
          vote_average={data.vote_average}
          genres={data.genres}
          isFavorite={isFavorite}
        />
      )
    );
  }, [data, error, isFavorite, isLoading, movieId]);

  return renderResponse;
};
