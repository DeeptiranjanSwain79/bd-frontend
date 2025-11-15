import { Box, MenuItem, Paper, Select, Typography } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
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

export type transactionChartDataType = {
  month: string;
  Total: number;
};
export type chartDataType = {
  thisWeek: transactionChartDataType[];
  lastMonth: transactionChartDataType[];
  last6Months: transactionChartDataType[];
  thisYear: transactionChartDataType[];
  yearWise: transactionChartDataType[];
};
const AreaChartAnalysis = ({
  data,
  chartType,
}: {
  data: chartDataType;
  chartType: string;
}) => {
  const [currentChartData, setCurrentChartData] = useState<
    transactionChartDataType[] | []
  >([]);
  const [thisWeekData, setThisWeekData] = useState<
    transactionChartDataType[] | []
  >([]);
  const [lastMonthData, setLastMonthData] = useState<
    transactionChartDataType[] | []
  >([]);
  const [last6MothsData, setLast6MothsData] = useState<
    transactionChartDataType[] | []
  >([]);
  const [thisYearData, setThisYearData] = useState<
    transactionChartDataType[] | []
  >([]);
  const [yearWiseData, setYearWiseData] = useState<
    transactionChartDataType[] | []
  >([]);
  const [currentState, setCurrentState] = useState("thisWeek");

  useEffect(() => {
    if (data) {
      setThisWeekData(data.thisWeek);
      setLastMonthData(data.lastMonth);
      setLast6MothsData(data.last6Months);
      setThisYearData(data.thisYear);
      setYearWiseData(data.yearWise);
    }
  }, [data]);

  useEffect(() => {
    switch (currentState) {
      case "thisWeek":
        setCurrentChartData(thisWeekData);
        break;
      case "lastMonth":
        setCurrentChartData(lastMonthData);
        break;
      case "last6Months":
        setCurrentChartData(last6MothsData);
        break;
      case "thisYear":
        setCurrentChartData(thisYearData);
        break;
      case "yearWise":
        setCurrentChartData(yearWiseData);
        break;
      default:
        setCurrentChartData(thisWeekData);
        break;
    }
  }, [
    currentState,
    last6MothsData,
    lastMonthData,
    thisWeekData,
    thisYearData,
    yearWiseData,
  ]);

  return (
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
      <Typography variant="h6" textTransform={"capitalize"} textAlign={"left"}>
        {chartType} Analytics
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
          <AreaChart width={150} height={300} data={currentChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month">
              <Label offset={0} position="insideBottom" />
            </XAxis>

            <YAxis dataKey="Total" domain={[0, "auto"]} />
            {/* <Tooltip /> */}
            <Tooltip
              contentStyle={{
                backgroundColor:
                  chartType === "investment"
                    ? blue[100]
                    : chartType === "expense"
                    ? red[100]
                    : green[100],
                borderColor:
                  chartType === "investment"
                    ? blue[800]
                    : chartType === "expense"
                    ? red[800]
                    : green[800],
                color:
                  chartType === "investment"
                    ? blue[900]
                    : chartType === "expense"
                    ? red[900]
                    : green[900],
                borderRadius: "0.5rem",
              }}
            />

            <Area
              dataKey="Total"
              stroke={
                chartType === "investment"
                  ? blue[800]
                  : chartType === "expense"
                  ? red[800]
                  : green[800]
              }
              fill={
                chartType === "investment"
                  ? blue[400]
                  : chartType === "expense"
                  ? red[400]
                  : green[400]
              }
            >
              <LabelList dataKey="Total" position="top" />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default AreaChartAnalysis;
