import {
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PropTypes from "prop-types";
import { useContext } from "react";
import { LogoutOutlined } from "@mui/icons-material";
import { AuthContext, AuthContextType } from "../../contexts/contexts";
import { themeModes } from "../../utils/theme";
import { NavMenuItems } from "./Menu";

const Sidebar = ({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: any;
}) => {
  const navigate = useNavigate();
  const {
    user,
    currentTheme: theme,
    setCurrentTheme,
    logout,
    activeState,
    setActiveState,
  } = useContext(AuthContext) as AuthContextType;

  const onSwitchTheme = () => {
    const currentTheme =
      theme === themeModes.dark ? themeModes.light : themeModes.dark;
    localStorage.setItem("theme", currentTheme);
    setCurrentTheme(currentTheme);
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          paddingY: "20px",
          color: "text.primary",
          backgroundColor: "background.paper",
        }}
      >
        <Stack width="50vw" direction="row" justifyContent="center">
          <Typography
            component={Link}
            to={user ? "/dashboard" : "/signin"}
            variant="h6"
            sx={{
              color: "primary.contrastText",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            BudgetDaddy
          </Typography>
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom={"20px"}>
          MENU
        </Typography>

        {NavMenuItems.map((item, index) => (
          <ListItemButton
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor:
                activeState === item.state ? "primary.main" : "unset",
            }}
            component={Link}
            to={item.path === "/" ? (user ? "/dashboard" : "/") : item.path}
            key={index}
            onClick={() => {
              setActiveState(item.state);
              toggleSidebar();
            }}
          >
            <ListItemIcon
              sx={{
                color: activeState === item.state ? "#fff" : "text.primary",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform={"uppercase"}>
                  {item.display}
                </Typography>
              }
              sx={{
                color: activeState === item.state ? "#fff" : "text.primary",
              }}
            />
          </ListItemButton>
        ))}

        <Typography variant="h6" marginBottom={"20px"}>
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {theme === themeModes.dark && <DarkModeOutlinedIcon />}
            {theme === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform={"uppercase"}>
                {theme === themeModes.light ? "light mode" : "dark mode"}
              </Typography>
            }
          />
        </ListItemButton>

        {!user ? (
          <ListItemButton
            component={Link}
            to={"/signin"}
            sx={{ width: { xs: "130%", md: "10%" } }}
          >
            Sign in
          </ListItemButton>
        ) : (
          <>
            <ListItemButton
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              <ListItemIcon>
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
                  )}`}
                  alt={`${user.name}`}
                  onClick={() => navigate("/profile")}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform={"uppercase"}>
                    {user?.name}
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform={"uppercase"}>Log out</Typography>
                }
              />
            </ListItemButton>
          </>
        )}
      </List>
    </>
  );

  return (
    <Drawer open={open} onClose={() => toggleSidebar(false)}>
      {drawer}
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Sidebar;
