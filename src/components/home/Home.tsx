import {Typography, Container} from "@mui/material";
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} = useTranslation();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {t('welcome')}
            </Typography>
            <Typography variant="body1">
                {t('home_description')}
            </Typography>
        </Container>
    );
};

export {Home};
