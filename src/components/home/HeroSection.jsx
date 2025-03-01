import { Box, Typography, Button } from "@mui/material";
import homeImage from "../../assets/bdhome.jpeg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundSize: "cover", // Adjust the sizing as needed
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        width: "100%",
        height: "90vh",
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: "relative",
        backgroundImage: `url(${homeImage})`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <motion.div
          style={{ width: "90%", textAlign: "center" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -400 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <Typography variant="h2" sx={{ color: "white" }}>
            Budget Smarter, Live Better
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Empower your financial future with intelligent budgeting and
            strategic planning
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              marginTop: "1rem",
              "&:hover": { color: "white" },
            }}
            onClick={() => navigate("/signin")}
          >
            Learn More
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;
