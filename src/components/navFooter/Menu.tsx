import {
  AssuredWorkloadOutlined,
  HomeOutlined,
  SellOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

export const NavMenuItems = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlined />,
    state: "home",
  },
  {
    display: "Incomes",
    path: "/incomes",
    icon: <AssuredWorkloadOutlined />,
    state: "income",
  },
  {
    display: "Expenses",
    path: "/expenses",
    icon: <SellOutlined />,
    state: "expense",
  },
  {
    display: "Investment",
    path: "/investments",
    icon: <TrendingUpOutlined />,
    state: "investment",
  },
];
