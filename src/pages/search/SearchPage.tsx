import { useMemo, useState } from "react";
import { customError } from "../details/DetailsPage";
import { useGetFilmBySearchQuery } from "../../services/film";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { PaginationDashboard } from "../../components/pagination/PaginationDashboard";
import { ListCards } from "../../components/listCards/ListCards";
import { SearchToFilm } from "../../components/searchTextField/SearchToFilm";
import { scrollStyle } from "../../components/style/GlobalStyle";

export const SearchPage = () => {
  const [queryString, setQueryString] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: { results, total_pages } = {},
    error,
    isLoading,
    isFetching,
  } = useGetFilmBySearchQuery({
    queryString: queryString,
    pageNumber: currentPage,
  });

  const isFetchBaseQueryError = (
    errorValue: unknown
  ): errorValue is FetchBaseQueryError => {
    return (errorValue as FetchBaseQueryError).data !== undefined;
  };

  const renderResponse = useMemo(() => {
    if (isLoading) {
      return (
        <Box display={"flex"} justifyContent={"center"} padding={2}>
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
      <>
        <SearchToFilm
          queryString={queryString}
          setQueryString={setQueryString}
        />
        <Box
          sx={{
            filter: isFetching ? "blur(5px)" : "none",
            transition: "filter 0.3s ease-in-out",
          }}
        >
          <PaginationDashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={total_pages}
            isFetching={isFetching}
          />
          <Container>
            <Box sx={scrollStyle}>
              <ListCards resultData={results} titleList={"Film By Search"} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }, [
    currentPage,
    error,
    isFetching,
    isLoading,
    queryString,
    results,
    total_pages,
  ]);
  return renderResponse;
};
