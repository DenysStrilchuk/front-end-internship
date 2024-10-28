import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../hooks";
import { Routes } from "../../utils";
import { selectIsAuthenticated } from "../../store/slices";
import { LogoutButton } from "../authContainer/logout-button";
import { LanguageSelector } from "../common/LanguageSelector";

const Header = () => {
    const { t } = useTranslation();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {t('My App')}
                </Typography>
                <Button color="inherit" component={RouterLink} to={Routes.HOME}>
                    {t('home')}
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.ABOUT}>
                    {t('about.header')}
                </Button>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit" component={RouterLink} to={Routes.USERS}>
                            {t('user.list')}
                        </Button>

                        <Button color="inherit" component={RouterLink} to={Routes.COMPANIES}>
                            {t('companies.title')}
                        </Button>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={RouterLink} to={Routes.LOGIN}>
                            {t('login.title')}
                        </Button>
                        <Button color="inherit" component={RouterLink} to={Routes.REGISTER}>
                            {t('register.title')}
                        </Button>
                    </>
                )}
                <LanguageSelector />
            </Toolbar>
        </AppBar>
    );
};

export { Header };
