import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import BackendAPI from "../api/client";
import { AuthContext, AuthContextType } from "../contexts/contexts";
import toast from "react-hot-toast";

const Signin = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e: any, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const tabChanger = (value: any) => {
    setCurrentTabIndex(value);
  };

  return (
    <Box
      sx={{
        minHeight: `90vh`,
        backgroundColor: "background.default",
        marginTop: { md: "5%", xs: "20%" },
        position: "relative",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Tabs
          value={currentTabIndex}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#991616",
            },
          }}
        >
          <Tab label="Log in" sx={{ color: "primary.light" }} />
          <Tab label="Sign up" sx={{ color: "primary.light" }} />
        </Tabs>
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {currentTabIndex === 0 ? (
          <Box sx={{ p: 3, width: { md: "70%", xs: "100%" } }}>
            <Login setCurrentTabIndex={tabChanger} />
          </Box>
        ) : (
          <Box sx={{ p: 3, width: { md: "70%", xs: "100%" } }}>
            <RegisterAccount setCurrentTabIndex={tabChanger} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Signin;

//Login component
const Login = ({ setCurrentTabIndex }: { setCurrentTabIndex: any }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext) as AuthContextType;

  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const signinForm = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .min(8, "password must contain 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values: any) => {
      try {
        setLoginLoading(true);
        const response: any = await BackendAPI.post("/auth/login", values);

        if (response && response.data && response.status === 200) {
          signinForm.resetForm();
          localStorage.setItem("token", response.data.token);
          toast.success("Successfully signed in");
          localStorage.setItem("token", response.data.token as string);
          login(response.data.user);
          navigate("/dashboard");
        }
      } catch (error: any) {
        setLoginLoading(false);
        setError(error?.response?.data?.error?.message || error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Log in
          </Typography>
          {error && (
            <Typography variant="body1" color="red" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Box component={"form"} onSubmit={signinForm.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email"
                  value={signinForm.values.email}
                  onChange={signinForm.handleChange}
                  color="success"
                  error={
                    signinForm.touched.email &&
                    signinForm.errors.email !== undefined
                  }
                  helperText={
                    signinForm.touched.email &&
                    (signinForm.errors.email as string)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={signinForm.values.password}
                  onChange={signinForm.handleChange}
                  color="success"
                  error={
                    signinForm.touched.password &&
                    signinForm.errors.password !== undefined
                  }
                  helperText={
                    signinForm.touched.password &&
                    (signinForm.errors.password as string)
                  }
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: red[600],
                    "&:hover": { backgroundColor: red[800] },
                  }}
                  type="submit"
                  loading={loginLoading}
                >
                  Signin
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Don&apos;t have an account?{" "}
                  <span
                    style={{ color: "#ff0000", cursor: "pointer" }}
                    onClick={() => setCurrentTabIndex(1)}
                  >
                    Register Here
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Forgot Password?{" "}
                  <Link
                    style={{ textDecoration: "none", color: "#ff0000" }}
                    to="/forgot-password"
                  >
                    Click Here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

// Register account
const RegisterAccount = ({
  setCurrentTabIndex,
}: {
  setCurrentTabIndex: any;
}) => {
  const { login } = useContext(AuthContext) as AuthContextType;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be of at least 3 characters")
        .max(50, "Name can't exceed 50 characters"),
      phone: Yup.string()
        .required("Phone number is required")
        .max(15, "Phone number can't exceed 15 digits"),
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .min(8, "password must contain 8 characters")
        .required("password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), "Passwords do not match"])
        .min(8, "Confirm Password must contain 8 characters")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values: any) => {
      try {
        if (values.password !== values.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        setIsLoading(true);
        const response: any = await BackendAPI.post("/auth/register", values);

        if (response && response.data && response.status === 201) {
          signupForm.resetForm();
          toast.success("Successfully signed up");
          login(response.data.user);
          localStorage.setItem("token", response.data.token as string);
          navigate("/dashboard");
        }
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.response?.data?.error || error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Box component={"form"} onSubmit={signupForm.handleSubmit}>
            <TextField
              label="Name"
              type="name"
              name="name"
              fullWidth
              required
              placeholder="John Doe"
              value={signupForm.values.name}
              onChange={signupForm.handleChange}
              margin="normal"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                sx={{ width: { md: "49%", xs: "100%" } }}
                required
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
                margin="normal"
              />{" "}
              <TextField
                label="Phone"
                type="number"
                name="phone"
                sx={{ width: { md: "49%", xs: "100%" } }}
                required
                value={signupForm.values.phone}
                onChange={signupForm.handleChange}
                margin="normal"
              />
            </Box>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              name="password"
              value={signupForm.values.password}
              onChange={signupForm.handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Button>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              value={signupForm.values.confirmPassword}
              onChange={signupForm.handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="toggle password visibility"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </Button>
                ),
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                backgroundColor: red[600],
                marginTop: "2vmax",
                "&:hover": { backgroundColor: red[800] },
              }}
              fullWidth
            >
              Register
            </Button>
            <Typography variant="body1" align="center" marginTop={"1rem"}>
              Received an Invitation?{" "}
              <span
                style={{ color: "#ff0000", cursor: "pointer" }}
                onClick={() => setCurrentTabIndex(0)}
              >
                Sign in Here
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

Login.propTypes = {
  setCurrentTabIndex: PropTypes.func.isRequired,
};

RegisterAccount.propTypes = {
  setCurrentTabIndex: PropTypes.func.isRequired,
};
