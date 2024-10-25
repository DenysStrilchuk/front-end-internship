import {Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

import {TestComponent} from "../test";

const About = () => {
    const {t} = useTranslation();

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('about_title')}
            </Typography>
            <Typography variant="body1">
                {t('about_description')}
            </Typography>
            <TestComponent/>
        </Container>
    );
};

export {About};