import { Box } from "@mui/material";
import TransactionAreaAnalysis from "../components/analytics/TransactionAreaAnalysis";
import DashboardCards from "../components/cards/DashboardCards";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../contexts/contexts";
import AuthWrapper from "../components/wrapper/AuthWrapper";

const Dashboard = () => {
  const { setIsAuthPage } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    setIsAuthPage(true);
  }, [setIsAuthPage]);

  return (
    <AuthWrapper>
      <Box sx={{ height: "100%" }}>
        <DashboardCards />
        <TransactionAreaAnalysis />
      </Box>
    </AuthWrapper>
  );
};

export default Dashboard;
