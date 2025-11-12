import {
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PrivateAPI } from "../../api/client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { blue, green, red } from "@mui/material/colors";

const TransactionAreaAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null); // Use a single state for all data
  const [currentData, setCurrentData] = useState<any>(null); // Use a single state for current data
  const [currentState, setCurrentState] = useState("thisWeek");

  useEffect(() => {
    getTransactionAnalytics();
  }, []);

  useEffect(() => {
    if (!analysisData) return;

    setCurrentData(analysisData[currentState]);
  }, [currentState, analysisData]);

  const getTransactionAnalytics = async () => {
    try {
      setLoading(true);
      const { data, status }: { data: { result: any }; status: number } =
        await PrivateAPI.get("/api/users/analysis/transaction");

      if (data && status === 200) {
        setAnalysisData(data.result);
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper
          sx={{
            height: "80vh",
            borderRadius: "0.5rem",
            marginTop: "3rem",
            padding: "1.8rem",
            textAlign: "center",
            mx: { md: 3, xs: 0 },
            mb: 5,
          }}
        >
          <Typography variant="h6" textAlign={"left"}>
            Analytics
          </Typography>

          <Box sx={{ textAlign: "right", width: "100%" }}>
            <Select
              value={currentState}
              onChange={(e) => setCurrentState(e.target.value)}
              sx={{ textAlign: "left", width: { md: "20%", xs: "50%" } }}
              required
            >
              <MenuItem value={"thisWeek"}>This Week</MenuItem>
              <MenuItem value={"lastMonth"}>Last Month</MenuItem>
              <MenuItem value={"last6Months"}>Last 6 Months</MenuItem>
              <MenuItem value={"thisYear"}>This Year</MenuItem>
              <MenuItem value={"yearWise"}>Yearwise</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width="100%" height={`96%`}>
              <AreaChart width={150} height={300} data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month">
                  <Label offset={0} position="insideBottom" />
                </XAxis>

                <YAxis domain={[0, "auto"]} />
                <Tooltip />

                <Area dataKey="Income" stroke={green[800]} fill={green[200]}>
                  <LabelList dataKey="Income" position="top" />
                </Area>
                <Area dataKey="Expense" stroke={red[800]} fill={red[500]}>
                  <LabelList dataKey="Expense" position="top" />
                </Area>
                <Area dataKey="Investment" stroke={blue[800]} fill={blue[200]}>
                  <LabelList dataKey="Investment" position="top" />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default TransactionAreaAnalysis;
