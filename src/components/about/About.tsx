import {Container, Typography} from "@mui/material";

const About = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                About Our Application
            </Typography>
            <Typography variant="body1">
                This is a mock page that provides information about our project.
            </Typography>
        </Container>
    );
};

export {About};