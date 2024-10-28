import {Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

import {TestComponent} from "../test";

const About = () => {
    const {t} = useTranslation();

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('about.title')}
            </Typography>
            <Typography variant="body1">
                {t('about.description')}
            </Typography>
            <TestComponent/>
        </Container>
    );
};

export {About};