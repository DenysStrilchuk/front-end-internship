import {Typography, Container} from "@mui/material";

const Home = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome to My Application
            </Typography>
            <Typography variant="body1">
                This application showcases various features
                and functionalities. You can navigate through the menu
                to explore different sections including About, Users, and Companies.
            </Typography>
        </Container>
    );
};

export {Home};
