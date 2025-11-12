import { ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { AuthContext } from "./contexts";
import { UserType } from "../utils/types";

const PUBLIC_ROUTES = [
  "/",
  "/signup",
  "/signin",
  "/forgot-password",
  "/payment-success",
  "/payment-failed",
];

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [activeState, setActiveState] = useState("home");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthPage, setIsAuthPage] = useState(false);

  /** Handle login */
  const login = (user: UserType) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  };

  /** Handle logout */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin", { replace: true }); // smoother navigation
  }, [navigate]);

  /** Initialize user authentication state */
  useEffect(() => {
    const currentPath = location.pathname;
    const isPublic = PUBLIC_ROUTES.includes(currentPath);
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (isPublic) {
      setLoading(false);
      return; //  stop here for public routes
    }

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser) as UserType;
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
      setLoading(false);
    } else {
      //  Only logout if we're on a protected route
      logout();
      setLoading(false);
    }
  }, [location.pathname, logout]);

  /** Track if we're on an auth page */
  useEffect(() => {
    const authPaths = ["/signin", "/signup", "/forgot-password"];
    setIsAuthPage(authPaths.includes(location.pathname));
  }, [location.pathname]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        loading,
        setLoading,
        currentTheme,
        setCurrentTheme,
        activeState,
        setActiveState,
        setIsAuthPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
