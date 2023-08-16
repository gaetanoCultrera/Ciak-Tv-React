import { FC, useMemo } from "react";
import { CustomDataCard } from "../../interfaces/IResponseMovie";
import { ContentCard } from "../card/contentCard/ContentCard";
import { Box, Typography } from "@mui/material";

interface DataCard {
  titleList: string;
  resultData?: CustomDataCard[];
}
export const ListCards: FC<DataCard> = ({ titleList, resultData }) => {
  const renderTitle = useMemo(
    () =>
      resultData?.length ? (
        <Typography
          padding={3}
          color={"black"}
          fontWeight={"bold"}
          variant="h6"
          sx={{
            textShadow:
              "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white",
          }}
        >
          {titleList}
        </Typography>
      ) : null,
    [resultData?.length, titleList]
  );
  const renderResponse = useMemo(
    () =>
      resultData?.map(({ id, title, poster_path }) => (
        <ContentCard key={id} id={id} title={title} poster_path={poster_path} />
      )),
    [resultData]
  );

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        {renderTitle}
      </Box>
      {renderResponse}
    </>
  );
};
