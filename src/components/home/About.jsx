import { ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container, Fade, Grid, Paper, Slide, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import aboutBg from "../../assets/aboutBg.jpg";

const About = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Fade in timeout={1000}>
        <Paper elevation={5} sx={{ p: 4, borderRadius: "16px" }}>
          <Slide direction="down" in timeout={1000}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              About Our Application
            </Typography>
          </Slide>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="left" in timeout={1000}>
                <div>
                  {" "}
                  {/* Added a div to wrap the content */}
                  <Typography variant="body1" paragraph>
                    Welcome to our application! We are dedicated to providing a
                    user-friendly and efficient platform for managing your
                    finances.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our mission is to empower you to take control of your
                    income, expenses, and investments, all in one place. Whether
                    you're tracking daily expenses, planning for your future, or
                    analyzing your financial trends, we've got you covered.
                  </Typography>
                  <LoadingButton
                    endIcon={<ChevronRight />}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/signin")}
                  >
                    Get Started
                  </LoadingButton>
                </div>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="right" in timeout={1000}>
                <div>
                  <img
                    src={aboutBg}
                    alt="Finance Management"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                </div>
              </Slide>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Container>
  );
};

export default About;
