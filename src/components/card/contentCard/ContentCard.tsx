import { memo, FC } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CustomDataCard } from "../../../interfaces/";
import { Link } from "react-router-dom";
import { contentCardBox } from "./style";
import { contentCardStyle } from "../../style/GlobalStyle";

export const ContentCard: FC<CustomDataCard> = memo(
  ({ id, title, poster_path }) => {
    return (
      <>
        <Box padding={1}>
          <Link to={`/details/${id}`}>
            <Card sx={contentCardBox}>
              <CardMedia
                component="img"
                alt="image film"
                height="400"
                image={
                  poster_path
                    ? `http://image.tmdb.org/t/p/original/${poster_path}`
                    : "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png"
                }
                sx={{
                  filter: "brightness(70%)",
                }}
              />

              <CardContent sx={contentCardStyle}>
                <Typography
                  fontWeight={"bold"}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Box>
      </>
    );
  }
);
