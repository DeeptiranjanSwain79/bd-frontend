import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion } from "framer-motion";
import { PrivateAPI } from "../../api/client";
import { LoadingButton } from "@mui/lab";
import { AuthContext, AuthContextType } from "../../contexts/contexts";
import toast from "react-hot-toast";
import { formatDateForInput } from "../../utils/formats";

interface Investment {
  category: string;
  amount: number;
  note: string;
  date: string;
}

const InvestmentForm = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [newInvestment, setNewInvestment] = useState<Investment>({
    category: "",
    amount: 0,
    note: "",
    date: formatDateForInput(new Date()),
  });
  const [isLoading, setIsLoading] = useState(false);
  const investmentCategories = user?.investments || [
    "STOCKS",
    "FD",
    "MF",
    "REAL_ESTATE",
    "GOLD",
    "BONDS",
    "CRYPTO",
  ];

  const handleAddInvestment = () => {
    if (newInvestment.category && newInvestment.amount > 0) {
      setInvestments([...investments, newInvestment]);
      setNewInvestment({
        category: "",
        amount: 0,
        note: "",
        date: formatDateForInput(new Date()),
      }); // Reset form
    }
  };

  const handleDeleteInvestment = (index: number) => {
    const updatedInvestments = investments.filter((_, i) => i !== index);
    setInvestments(updatedInvestments);
  };

  const handleSubitIncomes = async () => {
    try {
      setIsLoading(true);
      const response: any = await PrivateAPI.post("/api/investments", {
        investments,
      });

      if (response && response.data && response.status === 201) {
        setInvestments([]);
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
          Add Investment
        </Typography>

        {/* Form for new investment */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newInvestment.category}
                label="Category"
                onChange={(e) =>
                  setNewInvestment({
                    ...newInvestment,
                    category: e.target.value,
                  })
                }
                sx={{ textAlign: "left" }}
                required
              >
                {investmentCategories.map((category, index) => (
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
              label="Amount"
              type="number"
              value={newInvestment.amount}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, amount: +e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              value={newInvestment.date}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, date: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Note"
              value={newInvestment.note}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, note: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddInvestment}
              fullWidth
            >
              Add Investment
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
          {/* List of investments */}
          {investments.map((investment, index) => (
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
                <strong>Category:</strong> {investment.category}
              </Typography>
              <Typography variant="body1">
                <strong>Amount:</strong> ₹{investment.amount}
              </Typography>
              <Typography variant="body1">
                <strong>Note:</strong> {investment.note}
              </Typography>
              <IconButton
                onClick={() => handleDeleteInvestment(index)}
                color="error"
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        {investments.length > 0 && (
          <LoadingButton
            sx={{ width: { md: "25%", xs: "40%" }, mt: 3 }}
            onClick={handleSubitIncomes}
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

export default InvestmentForm;
