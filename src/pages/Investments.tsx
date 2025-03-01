import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateAPI } from "../api/client";
import AreaChartAnalysis, {
  chartDataType,
} from "../components/analytics/AreaChartAnalysis";
import TransactionComponent from "../components/analytics/TransactionComponent";
import InvestmentForm from "../components/forms/InvestmentForm";
import TransactionTable from "../components/tables/TransactionTable";
import { AuthContext, AuthContextType } from "../contexts/contexts";

const Investments = () => {
  const { setActiveState } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [investmentData, setInvestmentData] = useState([]);
  const [analytics, setAnalytics] = useState<chartDataType | null>(null);

  useEffect(() => {
    setActiveState("investment");
    getInvestments();
    getInvestmentAnalytics();
  }, [setActiveState]);

  const getInvestments = async () => {
    try {
      setLoading(true);
      const { data, status }: { status: number; data: any } =
        await PrivateAPI.get("/api/investments/me");

      if (data && status === 200) {
        setInvestmentData(data.investments);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInvestmentAnalytics = async () => {
    try {
      setLoading(true);
      const { data, status }: { status: number; data: any } =
        await PrivateAPI.post("/api/investments/me");

      if (data && status === 200) {
        setAnalytics(data.result);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: { md: "5%", xs: "15%" } }}>
      <InvestmentForm />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {analytics !== null && (
            <AreaChartAnalysis data={analytics} chartType="investment" />
          )}

          <Box
            sx={{
              borderRadius: "0.5rem",
              marginTop: "3rem",
              padding: "1.8rem",
              textAlign: "center",
              mx: { md: 3, xs: 0 },
              mb: 5,
            }}
          >
            <TransactionComponent type="investment" />
          </Box>

          {investmentData?.length > 0 && (
            <TransactionTable data={investmentData} tableType="investment" />
          )}
        </>
      )}
    </Box>
  );
};

export default Investments;
