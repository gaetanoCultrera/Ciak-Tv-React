import { FC, memo } from "react";
import { Box, Button, Typography } from "@mui/material";

interface DataPagination {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number | undefined;
  isFetching: boolean;
}

export const PaginationDashboard: FC<DataPagination> = memo(
  ({ currentPage, setCurrentPage, totalPages, isFetching }) => {
    return (
      <Box padding={1} display={"flex"} justifyContent={"center"}>
        {currentPage > 1 && (
          <Button
            color="error"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={isFetching}
          >
            {currentPage - 1}
          </Button>
        )}
        <Typography display={"flex"} alignItems={"center"} color={"black"}>
          {currentPage}
        </Typography>
        <Button
          color="error"
          disabled={currentPage === totalPages || isFetching}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {currentPage + 1}
        </Button>
      </Box>
    );
  }
);
