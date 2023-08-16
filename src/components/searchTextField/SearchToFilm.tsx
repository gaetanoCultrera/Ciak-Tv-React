import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction, FC } from "react";

interface IDataFromInput {
  queryString: string;
  setQueryString: Dispatch<SetStateAction<string>>;
}
export const SearchToFilm: FC<IDataFromInput> = ({
  queryString,
  setQueryString,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
    >
      <TextField
        type="text"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "4px",
        }}
        onChange={(e) => setQueryString(e.target.value)}
        placeholder="term to search"
        value={queryString}
        required
      />
    </Box>
  );
};
