import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Routes} from "../../utils/routes";
import {LanguageSelector} from "../common/LanguageSelector/LanguageSelector";

const Header = () => {
    const {t} = useTranslation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    My App
                </Typography>
                <Button color="inherit" component={RouterLink} to={Routes.HOME}>
                    {t('home')}
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.ABOUT}>
                    {t('about')}
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.USERS}>
                    {t('users')}
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.COMPANIES}>
                    {t('companies')}
                </Button>
                <LanguageSelector/>
            </Toolbar>
        </AppBar>
    );
};

export {Header};
