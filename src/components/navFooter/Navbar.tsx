import React, { cloneElement, useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
  useScrollTrigger,
  Stack,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LogoutOutlined, Menu } from "@mui/icons-material";
import { AuthContext, AuthContextType } from "../../contexts/contexts";
import { themeModes } from "../../utils/theme";
import { NavMenuItems } from "./Menu";

const ScrollAppBar = ({ children, window }: any) => {
  const { currentTheme: theme } = useContext(AuthContext) as AuthContextType;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });
  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : theme === themeModes.dark
        ? "primary.contrastTest"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : theme === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Navbar = () => {
  const navigate = useNavigate();
  const themeMode = localStorage.getItem("theme") || "light";
  const {
    user,
    logout,
    currentTheme,
    setCurrentTheme,
    activeState,
    setActiveState,
  } = useContext(AuthContext) as AuthContextType;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSwitchTheme = () => {
    const currentTheme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    localStorage.setItem("theme", currentTheme);
    setCurrentTheme(currentTheme);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 999 }}>
          <Toolbar
            sx={{
              alignContent: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <Menu />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Typography
                  component={Link}
                  to={user ? "/dashboard" : "/signin"}
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  BudgetDaddy
                </Typography>
              </Box>
            </Stack>

            {/* MAIN MENU */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: { md: "flex", xs: "none" },
                alignItems: "center",
                width: "84%",
              }}
            >
              <Typography
                component={Link}
                to={user ? "/dashboard" : "/"}
                variant="h6"
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                BudgetDaddy
              </Typography>

              {NavMenuItems(user).map((item, index) => (
                <Button
                  sx={{
                    color: activeState === item.state ? "#fff" : "text.primary",
                    marginRight: "5vmax",
                  }}
                  component={Link}
                  to={
                    item.path === "/" ? (user ? "/dashboard" : "/") : item.path
                  }
                  key={index}
                  variant={activeState === item.state ? "contained" : "text"}
                  onClick={() => setActiveState(item.state)}
                >
                  {item.display}
                </Button>
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { md: "flex", xs: "none" },
                alignItems: "center",
                width: "15%",
                justifyContent: "flex-end",
              }}
            >
              {!user ? (
                <Button
                  variant="contained"
                  component={Link}
                  to={"/signin"}
                  sx={{ width: { xs: "130%", md: "auto" } }}
                >
                  Sign in
                </Button>
              ) : (
                <>
                  <Avatar
                    sx={{
                      margin: 1,
                      height: 30,
                      width: 30,
                      cursor: "pointer",
                    }}
                    src={`https://ui-avatars.com/api/?name=${user?.name?.replace(
                      " ",
                      "+"
                    )}${
                      activeState === "profile"
                        ? "&background=6b0303&color=fff"
                        : ""
                    }`}
                    alt=""
                    onClick={() => navigate("/profile")}
                  />

                  <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                    {currentTheme === themeModes.dark && <Brightness7Icon />}
                    {currentTheme === themeModes.light && <Brightness4Icon />}
                  </IconButton>

                  <Button
                    startIcon={<LogoutOutlined />}
                    variant="contained"
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Navbar;
