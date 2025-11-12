import { DeleteOutline } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { PrivateAPI } from "../../api/client";
import { AuthContext, AuthContextType } from "../../contexts/contexts";
import {
  formatDateForInput,
  formatDateToDateString,
} from "../../utils/formats";
import toast from "react-hot-toast";

interface Income {
  source: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}

const IncomeForm = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [newIncome, setNewIncome] = useState<Income>({
    source: "",
    amount: 0,
    category: "",
    note: "",
    date: formatDateForInput(new Date()),
  });
  const [isLoading, setIsLoading] = useState(false);

  const incomeCategories = user?.incomes || [
    "SALARY",
    "FREELANCING",
    "INVESTMENT_RETURNS",
    "RENTAL_INCOME",
    "BUSINESS_INCOME",
    "DIVIDENDS",
    "CAPITAL_GAINS",
  ];

  const handleAddIncome = () => {
    if (newIncome.source && newIncome.amount > 0) {
      setIncomes([...incomes, newIncome]);
      setNewIncome({
        source: "",
        amount: 0,
        category: "",
        note: "",
        date: formatDateForInput(new Date()),
      });
    }
  };

  const handleDeleteIncome = (index: number) => {
    const updatedIncomes = incomes.filter((_, i) => i !== index);
    setIncomes(updatedIncomes);
  };

  const handleSubitIncomes = async () => {
    try {
      setIsLoading(true);
      const response: any = await PrivateAPI.post("/api/incomes", {
        incomes,
      });

      if (response && response.data && response.status === 201) {
        setIncomes([]);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error?.message || error.message);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible">
      <Box
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          width: { md: "80%", xs: "90%" },
          ml: { md: 3, xs: 2 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Income
        </Typography>

        {/* Form for new income */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Source"
              value={newIncome.source}
              onChange={(e) =>
                setNewIncome({ ...newIncome, source: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newIncome.amount}
              onChange={(e) =>
                setNewIncome({ ...newIncome, amount: +e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newIncome.category}
                label="Category"
                onChange={(e) =>
                  setNewIncome({ ...newIncome, category: e.target.value })
                }
                sx={{ textAlign: "left" }}
                required
              >
                {incomeCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category.replace("_", " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              value={newIncome.date}
              onChange={(e) =>
                setNewIncome({ ...newIncome, date: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Note"
              value={newIncome.note}
              onChange={(e) =>
                setNewIncome({ ...newIncome, note: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddIncome}
              fullWidth
            >
              Add Income
            </Button>
          </Grid>
        </Grid>

        {/* List of incomes */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {incomes.map((income, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                width: { md: "30%", xs: "90%" },
              }}
            >
              <Typography variant="body1">
                <strong>Source:</strong> {income.source}
              </Typography>
              <Typography variant="body1">
                <strong>Amount:</strong> ₹{income.amount}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {income.category.replace("_", " ")}
              </Typography>
              <Typography variant="body1">
                <strong>Note:</strong> {income.note}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong>{" "}
                {formatDateToDateString(new Date(income.date))}
              </Typography>
              <IconButton
                onClick={() => handleDeleteIncome(index)}
                color="error"
              >
                <DeleteOutline />
              </IconButton>
            </Box>
          ))}
        </Box>
        {incomes.length > 0 && (
          <Button
            sx={{ width: { md: "25%", xs: "40%" }, mt: 3 }}
            onClick={handleSubitIncomes}
            loading={isLoading}
            variant="contained"
          >
            Save
          </Button>
        )}
      </Box>
    </motion.div>
  );
};

export default IncomeForm;
