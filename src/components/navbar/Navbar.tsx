import { useState, useMemo, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { Route } from "../../constans/Route";
import { Button, Drawer, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { NavbarItem } from "../navbarItem/NavbarItem";

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderMobile = useMemo(() => {
    return isMobile ? (
      <IconButton
        data-testid="menu"
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    ) : (
      <NavbarItem />
    );
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(to bottom, blue, transparent)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to={Route.DASHBOARD}>
            <Box
              data-testid="customImgNavbar"
              component="img"
              sx={{
                height: 64,
                mixBlendMode: "color-burn",
              }}
              alt="Your logo."
              src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Deus_ciak.png"
            />
          </NavLink>

          {renderMobile}
          <Drawer data-testid="drawer" anchor="right" open={isDrawerOpen}>
            <Button
              data-testid="customButton"
              onClick={() => setIsDrawerOpen(false)}
            >
              <CloseIcon />
            </Button>
            <NavbarItem />
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
