import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateAPI } from "../../api/client";
import TransactionCards from "../cards/TransactionCards";

const TransactionComponent = ({ type }: { type: string }) => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [queryType, setQueryType] = useState("last10");

  const getTransactions = async () => {
    try {
      let requestBody: any = { queryType: queryType };

      if (queryType === "custom") {
        if (!startDate || !endDate) {
          toast.error("Please select start and end dates.");
          return;
        }
        requestBody = {
          queryType,
          startDate,
          endDate,
        };
      }

      const { data, status }: { data: any; status: number } =
        await PrivateAPI.post(`/api/${type}s/me/transactions`, {
          ...requestBody,
        });
      if (data && status === 200) {
        setTransactions(data.transactions);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  const handleQueryTypeChange = (newQueryType: string) => {
    setQueryType(newQueryType);
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    if (queryType === "last10") {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryType]); // Fetch on queryType change

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          variant={queryType === "last10" ? "contained" : "outlined"}
          onClick={() => handleQueryTypeChange("last10")}
          sx={{ mr: 5 }}
        >
          Last 10
        </Button>
        <Button
          variant={queryType === "custom" ? "contained" : "outlined"}
          onClick={() => handleQueryTypeChange("custom")}
        >
          Custom Range
        </Button>
      </Grid>
      {queryType === "custom" && (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={getTransactions}>
              Filter
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <TransactionCards transactions={transactions} type={type} />
      </Grid>
    </Grid>
  );
};

export default TransactionComponent;
