import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import {
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "../../services/film";
import { MovieList } from "../../components/movieList/MovieList";

export const DashboardPage = () => {
  const [currentPageTopRated, setCurrentTopRated] = useState(1);
  const [currentPageUpComing, setCurrentPageUpComing] = useState(1);

  const {
    data: { results: resultsTopRated, total_pages: totalPagesTopRated } = {},
    error: errorTopRated,
    isLoading: isLoadingTopRated,
    isFetching: isFetchingTopRated,
  } = useGetTopRatedMoviesQuery(currentPageTopRated);

  const {
    data: { results: resultsUpComing, total_pages: totalPagesUpComing } = {},
    error: errorUpComing,
    isLoading: isLoadingUpComing,
    isFetching: isFetchingUpComing,
  } = useGetUpcomingMoviesQuery(currentPageUpComing);

  const renderResponse = useMemo(
    () => (
      <Box sx={{ padding: 2 }}>
        <MovieList
          isLoading={isLoadingUpComing}
          error={errorUpComing}
          isFetching={isFetchingUpComing}
          results={resultsUpComing}
          totalPages={resultsUpComing ? totalPagesUpComing : undefined}
          currentPage={currentPageUpComing}
          setCurrentPage={setCurrentPageUpComing}
          titleList={"Up Coming"}
        />
        <MovieList
          isLoading={isLoadingTopRated}
          error={errorTopRated}
          isFetching={isFetchingTopRated}
          results={resultsTopRated}
          totalPages={resultsTopRated ? totalPagesTopRated : undefined}
          currentPage={currentPageTopRated}
          setCurrentPage={setCurrentTopRated}
          titleList={"Top Rated"}
        />
      </Box>
    ),
    [
      currentPageTopRated,
      currentPageUpComing,
      errorTopRated,
      errorUpComing,
      isFetchingTopRated,
      isFetchingUpComing,
      isLoadingTopRated,
      isLoadingUpComing,
      resultsTopRated,
      resultsUpComing,
      totalPagesTopRated,
      totalPagesUpComing,
    ]
  );

  return renderResponse;
};
