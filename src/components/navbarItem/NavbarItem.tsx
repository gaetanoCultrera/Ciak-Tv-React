import { Avatar, Box, Tooltip } from "@mui/material";

import { NavLink } from "react-router-dom";
import { Route } from "../../constans/Route";

export const NavbarItem = () => {
  const renderItemNavbar = (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", sm: "flex" },
        flexDirection: { xs: "column", sm: "row" },
        padding: 3,
      }}
    >
      <Box padding={1}>
        <NavLink
          to={Route.DASHBOARD}
          style={({ isActive }) => ({
            color: isActive ? "red" : "gray",
            textDecoration: "none",
          })}
        >
          Dashboard
        </NavLink>
      </Box>
      <Box padding={1}>
        <NavLink
          to={Route.SEARCH}
          style={({ isActive }) => ({
            color: isActive ? "red" : "gray",
            textDecoration: "none",
          })}
        >
          Search
        </NavLink>
      </Box>
      <Box padding={1}>
        <NavLink
          to={Route.FAVORITE}
          style={({ isActive }) => ({
            color: isActive ? "red" : "gray",
            textDecoration: "none",
          })}
        >
          My Favorite
        </NavLink>
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
        }}
      >
        <Tooltip title="Open settings">
          <NavLink to={Route.PROFILE}>
            <Avatar
              alt="avatar"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            />
          </NavLink>
        </Tooltip>
      </Box>
    </Box>
  );
  return renderItemNavbar;
};
