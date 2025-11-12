import { Box, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PrivateAPI } from "../api/client";
import AreaChartAnalysis, {
  chartDataType,
} from "../components/analytics/AreaChartAnalysis";
import TransactionComponent from "../components/analytics/TransactionComponent";
import ExpenseForm from "../components/forms/ExpenseForm";
import TransactionTable from "../components/tables/TransactionTable";
import { AuthContext, AuthContextType } from "../contexts/contexts";
import AuthWrapper from "../components/wrapper/AuthWrapper";

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
      console.log(error?.response?.data?.error || error.message);
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
      <ExpenseForm />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {analytics !== null && (
            <AreaChartAnalysis data={analytics} chartType="expense" />
          )}

          {expenseData?.length > 0 ? (
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
                <TransactionComponent type="expense" />
              </Box>

              <TransactionTable data={expenseData} tableType="expense" />
            </>
          ) : (
            <Typography
              variant="h6"
              align="center"
              color="error"
              sx={{ mt: 5 }}
            >
              No expenses found.
            </Typography>
          )}
        </>
      )}
    </AuthWrapper>
  );
};

export default Expenses;
