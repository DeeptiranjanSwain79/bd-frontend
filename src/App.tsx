import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import themeConfigs from "./utils/theme";
import Navbar from "./components/navFooter/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./contexts/contexts";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Investments from "./pages/Investments";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";

const App = () => {
  const { currentTheme } = useContext(AuthContext) as AuthContextType;

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: currentTheme })}>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
