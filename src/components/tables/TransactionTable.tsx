import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDateToDateString } from "../../utils/formats";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TransactionTable = ({
  data,
  tableType,
}: {
  data: any[];
  tableType: string;
}) => {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "amount", headerName: "Amount", flex: 0.6 },
    {
      field: "category",
      headerName: "Category",
      flex: 0.6,
    },
    { field: "date", headerName: "Date", flex: 0.8 },
    {
      field: "name",
      headerName:
        tableType === "expense"
          ? "Type"
          : tableType === "income"
          ? "Source"
          : "Note",
      flex: 1.5,
    },
  ];

  useEffect(() => {
    if (data && data.length > 0) {
      const newRows = data.map((item) => ({
        id: item._id,
        amount: `₹${item.amount}`,
        date: formatDateToDateString(new Date(item.date)),
        category: item.category?.replace("_", " "),
        name:
          tableType === "expense"
            ? item.name
            : tableType === "income"
            ? item.source
            : item.note,
      }));
      setRows(newRows as any);
    } else {
      setRows([]);
    }
  }, [data, tableType]);

  return (
    <Paper
      sx={{
        minHeight: "10vmax",
        height: "auto",
        borderRadius: "0.5rem",
        marginTop: "1rem",
        padding: "2rem 1rem",
        textAlign: "left",
        // width: "100%",
        mx: 3,
        mb: 5,
      }}
    >
      {rows.length === 0 ? (
        <Typography
          sx={{ textAlign: "center", color: "text.secondary" }}
          variant="h5"
        >
          No Data
        </Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      )}
    </Paper>
  );
};

export default TransactionTable;
