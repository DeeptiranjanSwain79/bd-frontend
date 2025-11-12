import { Box, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PrivateAPI } from "../api/client";
import AreaChartAnalysis, {
  chartDataType,
} from "../components/analytics/AreaChartAnalysis";
import TransactionComponent from "../components/analytics/TransactionComponent";
import IncomeForm from "../components/forms/IncomeForm";
import TransactionTable from "../components/tables/TransactionTable";
import { AuthContext, AuthContextType } from "../contexts/contexts";
import AuthWrapper from "../components/wrapper/AuthWrapper";

const Incomes = () => {
  const { setActiveState } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [analytics, setAnalytics] = useState<chartDataType | null>(null);

  useEffect(() => {
    setActiveState("income");
    getIncomes();
    getIncomeAnalysis();
  }, [setActiveState]);

  const getIncomes = async () => {
    try {
      setLoading(true);
      const { data, status }: { status: number; data: any } =
        await PrivateAPI.get("/api/incomes/me");

      if (data && status === 200) {
        setIncomeData(data.incomes);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getIncomeAnalysis = async () => {
    try {
      setLoading(true);
      const { data, status }: { status: number; data: any } =
        await PrivateAPI.post("/api/incomes/me");

      if (data && status === 200) {
        setAnalytics(data.result);
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <IncomeForm />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {analytics !== null && (
            <AreaChartAnalysis data={analytics} chartType="income" />
          )}

          {incomeData?.length > 0 ? (
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
                <TransactionComponent type="income" />
              </Box>

              <TransactionTable data={incomeData} tableType="income" />
            </>
          ) : (
            <Typography
              variant="h6"
              align="center"
              color="error"
              sx={{ mt: 5 }}
            >
              No incomes found.
            </Typography>
          )}
        </>
      )}
    </AuthWrapper>
  );
};

export default Incomes;
