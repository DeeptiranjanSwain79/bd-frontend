import { Box, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PrivateAPI } from "../api/client";
import AreaChartAnalysis, {
  chartDataType,
} from "../components/analytics/AreaChartAnalysis";
import TransactionComponent from "../components/analytics/TransactionComponent";
import InvestmentForm from "../components/forms/InvestmentForm";
import TransactionTable from "../components/tables/TransactionTable";
import { AuthContext, AuthContextType } from "../contexts/contexts";
import AuthWrapper from "../components/wrapper/AuthWrapper";

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
      console.log(error);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <InvestmentForm />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {analytics !== null && (
            <AreaChartAnalysis data={analytics} chartType="investment" />
          )}

          {investmentData?.length > 0 ? (
            <>
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

              <TransactionTable data={investmentData} tableType="investment" />
            </>
          ) : (
            <Typography
              variant="h6"
              align="center"
              color="error"
              sx={{ mt: 5 }}
            >
              No investments found.
            </Typography>
          )}
        </>
      )}
    </AuthWrapper>
  );
};

export default Investments;
