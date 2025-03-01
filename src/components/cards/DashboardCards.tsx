import {
  AssuredWorkloadOutlined,
  SellOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Box, Card, Grid, styled, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s",
  display: "flex", // Enable flexbox for horizontal layout
  alignItems: "center", // Vertically align items,
  height: 100, // Fixed height for smaller cards
  padding: theme.spacing(1), // Reduced padding
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[4],
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 60, // Fixed width for icons
}));

const DashboardCards: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Add Income",
      icon: <AssuredWorkloadOutlined sx={{ fontSize: 40, color: "green" }} />,
      route: "/incomes",
    },
    {
      title: "Add Expense",
      icon: <SellOutlined sx={{ fontSize: 40, color: "red" }} />,
      route: "/expenses",
    },
    {
      title: "Add Investment",
      icon: <TrendingUpOutlined sx={{ fontSize: 40, color: blue[600] }} />,
      route: "/investments",
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible">
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {" "}
        {/* Reduced padding */}
        <Grid container spacing={2}>
          {" "}
          {/* Reduced spacing */}
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {" "}
              {/* Added lg for larger screens */}
              <StyledCard onClick={() => navigate(card.route)}>
                <IconContainer>
                  {" "}
                  {/* Container for the icon */}
                  {card.icon}
                </IconContainer>{" "}
                {/* Content takes remaining space */}
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ flex: 1, padding: 1 }}
                >
                  {card.title}
                </Typography>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default DashboardCards;
