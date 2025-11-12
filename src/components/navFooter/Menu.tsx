import {
  AssuredWorkloadOutlined,
  HomeOutlined,
  SellOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import type { UserType } from "../../utils/types";

export const NavMenuItems = (user: UserType | null) => {
  if (user === null) {
    return [
      {
        display: "home",
        path: "/",
        icon: <HomeOutlined />,
        state: "home",
      },
    ];
  } else {
    return [
      {
        display: "Dashboard",
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
  }
};
