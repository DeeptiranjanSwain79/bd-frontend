import React, { ReactNode, useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return <Box sx={{ marginTop: { md: "5%", xs: "10%" } }}>{children}</Box>;
};

export default AuthWrapper;
