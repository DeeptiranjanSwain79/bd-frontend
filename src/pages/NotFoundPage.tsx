import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';


const NotFoundPage = () => {
    const user = true;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: "background.default",
            }}
        >
            <Typography variant="h1" sx={{ color: "primary.main" }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ color: "text.primary" }}>
                Page not found
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", marginBottom: 4 }}>
                {"We're sorry, but it seems the page you are looking for doesn't exist."}
            </Typography>
            <Button
                component={Link}
                to={user ? "/dashboard" : "/signin"}
                variant="contained"
                sx={{ backgroundColor: "primary.button", color: "primary.contrastTest", "&:hover": { backgroundColor: "primary.button" } }}
            >
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;