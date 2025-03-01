import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateAPI } from "../api/client";
import AreaChartAnalysis, {
  chartDataType,
} from "../components/analytics/AreaChartAnalysis";
import TransactionComponent from "../components/analytics/TransactionComponent";
import ExpenseForm from "../components/forms/ExpenseForm";
import TransactionTable from "../components/tables/TransactionTable";
import { AuthContext, AuthContextType } from "../contexts/contexts";

const Expenses = () => {
  const { setActiveState } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [analytics, setAnalytics] = useState<chartDataType | null>(null);

  useEffect(() => {
    setActiveState("expense");
    getExpenses();
    getExpenseAnalytics();
  }, [setActiveState]);

  const getExpenses = async () => {
    try {
      setLoading(true);
      const { data, status }: { status: number; data: any } =
        await PrivateAPI.get("/api/expenses/me");

      if (data && status === 200) {
        setExpenseData(data.expenses);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getExpenseAnalytics = async () => {
    try {
      setLoading(true);
      const { data, status }: { status: number; data: any } =
        await PrivateAPI.post("/api/expenses/me");

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
      <ExpenseForm />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {analytics !== null && (
            <AreaChartAnalysis data={analytics} chartType="expense" />
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
            <TransactionComponent type="expense" />
          </Box>

          {expenseData?.length > 0 && (
            <TransactionTable data={expenseData} tableType="expense" />
          )}
        </>
      )}
    </Box>
  );
};

export default Expenses;
