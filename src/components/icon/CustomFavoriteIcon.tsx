import { memo, FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CustomIcon {
  isFavorite: boolean;
}

export const CustomFavoriteIcon: FC<CustomIcon> = memo(({ isFavorite }) => (
  <FavoriteIcon sx={{ fontSize: "50px", fill: isFavorite ? "red" : "white" }} />
));
