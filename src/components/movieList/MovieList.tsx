import { useMemo, FC } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Box, CircularProgress, Typography } from "@mui/material";
import { customError } from "../../pages/details/DetailsPage";
import { scrollStyle } from "../style/GlobalStyle";
import { ListCards } from "../listCards/ListCards";
import { SerializedError } from "@reduxjs/toolkit";
import { CustomDataCard } from "../../interfaces/IResponseMovie";
import { PaginationDashboard } from "../pagination/PaginationDashboard";

interface IMovieListParams {
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  isFetching: boolean;
  results?: CustomDataCard[];
  totalPages?: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  titleList: string;
}

export const MovieList: FC<IMovieListParams> = ({
  isLoading,
  error,
  isFetching,
  results,
  totalPages,
  currentPage,
  setCurrentPage,
  titleList,
}) => {
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
        <Box
          sx={{
            filter: isFetching ? "blur(5px)" : "none",
            transition: "filter 0.3s ease-in-out",
          }}
        >
          <PaginationDashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            isFetching={isFetching}
          />
          <Box sx={scrollStyle}>
            <ListCards resultData={results} titleList={titleList} />
          </Box>
        </Box>
      </>
    );
  }, [
    currentPage,
    error,
    isFetching,
    isLoading,
    results,
    setCurrentPage,
    titleList,
    totalPages,
  ]);

  return renderResponse;
};
