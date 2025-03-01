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
import { LoadingButton } from "@mui/lab";
import { AuthContext, AuthContextType } from "../../contexts/contexts";
import toast from "react-hot-toast";
import { formatDateForInput } from "../../utils/formats";

interface Expense {
  name: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}

const ExpenseForm = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({
    name: "",
    amount: 0,
    category: "",
    note: "",
    date: formatDateForInput(new Date()),
  });
  const [isLoading, setIsLoading] = useState(false);

  const expenseCategories = user?.expenses || [
    "GROCERY",
    "SHOPPING",
    "JEWELLERY",
    "PHONE_RECHARGE",
    "UTILITIES",
    "TRANSPORTATION",
    "DINING_OUT",
    "ENTERTAINMENT",
  ];

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({
        name: "",
        amount: 0,
        category: "",
        note: "",
        date: formatDateForInput(new Date()),
      }); // Reset form
    }
  };

  const handleDeleteExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleSubitExpenses = async () => {
    try {
      setIsLoading(true);
      const response: any = await PrivateAPI.post("/api/expenses", {
        expenses,
      });

      if (response && response.data && response.status === 201) {
        setExpenses([]);
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
          Add Expense
        </Typography>

        {/* Form for new expense */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={newExpense.name}
              onChange={(e) =>
                setNewExpense({ ...newExpense, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: +e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newExpense.category}
                label="Category"
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
                sx={{ textAlign: "left" }}
                required
              >
                {expenseCategories.map((category, index) => (
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
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Note"
              value={newExpense.note}
              onChange={(e) =>
                setNewExpense({ ...newExpense, note: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddExpense}
              fullWidth
            >
              Add Expense
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {/* List of expenses */}
          {expenses.map((expense, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                width: { md: "30%", xs: "90%" },
                ml: { md: 3, xs: "auto" },
              }}
            >
              <Typography variant="body1">
                <strong>Name:</strong> {expense.name}
              </Typography>
              <Typography variant="body1">
                <strong>Amount:</strong> ₹{expense.amount}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {expense.category}
              </Typography>
              <Typography variant="body1">
                <strong>Note:</strong> {expense.note}
              </Typography>
              <IconButton
                onClick={() => handleDeleteExpense(index)}
                color="error"
              >
                <DeleteOutline />
              </IconButton>
            </Box>
          ))}
        </Box>
        {expenses.length > 0 && (
          <LoadingButton
            sx={{ width: { md: "25%", xs: "40%" }, mt: 3 }}
            onClick={handleSubitExpenses}
            loading={isLoading}
            variant="contained"
          >
            Save
          </LoadingButton>
        )}
      </Box>
    </motion.div>
  );
};

export default ExpenseForm;
