import { Container, Link, Paper, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      component="footer"
      sx={{
        padding: "20px 0",
        textAlign: "center",
        marginTop: "50px", // Add some space above the footer
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          {"Copyright © "}
          {new Date().getFullYear()} {" BudgetDaddy."}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {"Developed by "}
          <Link
            href="https://deeptiranjanswain.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            DEEPTIRANJAN SWAIN
          </Link>
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
