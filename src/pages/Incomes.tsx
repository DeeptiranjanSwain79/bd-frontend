import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateAPI } from "../api/client";
import AreaChartAnalysis, {
  chartDataType,
} from "../components/analytics/AreaChartAnalysis";
import TransactionComponent from "../components/analytics/TransactionComponent";
import IncomeForm from "../components/forms/IncomeForm";
import TransactionTable from "../components/tables/TransactionTable";
import { AuthContext, AuthContextType } from "../contexts/contexts";

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
      toast.error(error?.response?.data?.error || error.message);
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
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: { md: "5%", xs: "15%" } }}>
      <IncomeForm />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {analytics !== null && (
            <AreaChartAnalysis data={analytics} chartType="income" />
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
            <TransactionComponent type="income" />
          </Box>

          {incomeData?.length > 0 && (
            <TransactionTable data={incomeData} tableType="income" />
          )}
        </>
      )}
    </Box>
  );
};

export default Incomes;
