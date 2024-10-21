import { Button, Container, Typography, useTheme } from "@mui/material";
import styles from './Home.module.css';

const Home = () => {
    const theme = useTheme();

    return (
        <div
            className={styles.root}
            style={{ backgroundColor: theme.palette.background.default }}
        >
            <Container>
                <Typography variant="h2" className={styles.title}>
                    Welcome to My Front End Internship Project
                </Typography>
                <Button variant="contained" color="primary" className={styles.button}>
                    Get Started
                </Button>
            </Container>
        </div>
    );
};

export { Home };
