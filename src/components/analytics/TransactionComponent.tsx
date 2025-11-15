import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateAPI } from "../../api/client";
import TransactionCards from "../cards/TransactionCards";
import { AuthContext, AuthContextType } from "../../contexts/contexts";

const TransactionComponent = ({ type }: { type: string }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [queryType, setQueryType] = useState("last10");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (type === "expense") {
      setAllCategories(user.expenses || []);
    } else if (type === "income") {
      setAllCategories(user.incomes || []);
    } else if (type === "investment") {
      setAllCategories(user.investments || []);
    }
  }, [type, user]);

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
          category,
        };
      }

      const { data, status }: { data: any; status: number } =
        await PrivateAPI.post(`/api/${type}s/me/transactions`, {
          ...requestBody,
        });
      if (data && status === 200) {
        setTransactions(data.transactions);
        setTotal(data.total);
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
    setCategory("");
  };

  useEffect(() => {
    if (queryType === "last10") {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryType]); // Fetch on queryType change

  return (
    <Grid
      component={Paper}
      sx={{ py: 8, borderRadius: "0.5rem", px: 4 }}
      container
      spacing={2}
    >
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
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {allCategories.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item.replace("_", " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={getTransactions}>
              Filter
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <TransactionCards
          total={total}
          transactions={transactions}
          type={type}
        />
      </Grid>
    </Grid>
  );
};

export default TransactionComponent;
