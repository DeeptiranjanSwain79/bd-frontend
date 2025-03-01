import { Box } from "@mui/material";
import TransactionAreaAnalysis from "../components/analytics/TransactionAreaAnalysis";
import DashboardCards from "../components/cards/DashboardCards";

const Dashboard = () => {
  return (
    <Box sx={{ height: "100%", marginTop: { md: "5%", xs: "10%" } }}>
      <DashboardCards />
      <TransactionAreaAnalysis />
    </Box>
  );
};

export default Dashboard;
