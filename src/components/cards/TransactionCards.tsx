import { Delete } from "@mui/icons-material";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { PrivateAPI } from "../../api/client"; // Adjust the import path

interface TransactionCardProps {
  transactions: any[];
  type: string;
  total: number;
}

const TransactionCards: React.FC<TransactionCardProps> = ({
  transactions,
  type,
  total = 0,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const { data, status }: { data: any; status: number } =
        await PrivateAPI.delete(`/api/${type}s/u/${id}`);
      if (status === 200 && data) {
        toast.success(data.message);
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting transaction"
      );
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Total {type.charAt(0).toUpperCase() + type.slice(1)}: ₹
          {total.toFixed(2)}
        </Typography>
      </Grid>
      {transactions.map((transaction, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card
            elevation={8}
            sx={{
              borderRadius: 8,
            }}
          >
            <CardContent sx={{ position: "relative" }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(transaction._id)}
                sx={{ position: "absolute", top: 8, right: 16 }}
              >
                <Delete />
              </IconButton>
              <Typography variant="h6">
                {type === "expense"
                  ? transaction.name
                  : type === "income"
                  ? transaction.source
                  : transaction.note}
              </Typography>
              <Typography variant="caption">
                {transaction.category?.replace("_", " ")}
              </Typography>
              <Typography variant="body2">
                Amount: ₹{transaction.amount.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Date: {new Date(transaction.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TransactionCards;
