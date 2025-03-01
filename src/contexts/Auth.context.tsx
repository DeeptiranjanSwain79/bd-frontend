import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localstorageUser } from "../utils/types";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "./contexts";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<localstorageUser | null>(null);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [activeState, setActiveState] = useState("home");
  const login = (user: localstorageUser) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const isPublic = [
      "/payment-success",
      "/payment-failed",
      "/signup",
      "/signin",
      "/forgot-password",
      "/",
    ].some((path) => window.location.href.includes(path));
    if (isPublic) {
      setLoading(false);
      return;
    }
    if (user) setLoading(false);
    if (
      !user &&
      localStorage.getItem("user") &&
      localStorage.getItem("token")
    ) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
      setLoading(false);
    } else if (
      !user &&
      !localStorage.getItem("user") &&
      !localStorage.getItem("token") &&
      !window.location.href.endsWith("/signup")
    ) {
      navigate("/signin");
      setLoading(false);
    } else if (localStorage.getItem("user") && !localStorage.getItem("token")) {
      localStorage.removeItem("user");
      navigate("/signin");
      setLoading(false);
    }
  }, [loading, navigate, user]);

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
        setActiveState
      }}
    >
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};
