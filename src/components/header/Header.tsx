import {Button} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {useAppSelector} from "../../hooks";
import {Routes} from "../../utils/routes";
import {selectIsAuthenticated} from "../../store/slices";
import {LogoutButton} from "../authContainer/logout-button";
import {LanguageSelector} from "../common/LanguageSelector";
import styles from "./Header.module.css";

const Header = () => {
  const {t} = useTranslation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <header className={styles.header}>
      <RouterLink to={Routes.HOME} className={styles.title}>
        {t('My App')}
      </RouterLink>
      <nav>
        <RouterLink to={Routes.HOME} className={styles.link}>
          <Button color="inherit">{t('home')}</Button>
        </RouterLink>
        <RouterLink to={Routes.ABOUT} className={styles.link}>
          <Button color="inherit">{t('about.header')}</Button>
        </RouterLink>
        {isAuthenticated ? (
          <span>
              <RouterLink to={Routes.USERS} className={styles.link}>
                  <Button color="inherit">{t('users.list')}</Button>
              </RouterLink>
              <RouterLink to={Routes.COMPANIES} className={styles.link}>
                  <Button color="inherit">{t('companies.title')}</Button>
              </RouterLink>
              <RouterLink to={Routes.PROFILE} className={styles.link}>
                  <Button color="inherit">{t('profile.title')}</Button>
              </RouterLink>
              <LogoutButton/>
          </span>
        ) : (
          <span>
              <RouterLink to={Routes.LOGIN} className={styles.link}>
                  <Button color="inherit">{t('login.title')}</Button>
              </RouterLink>
              <RouterLink to={Routes.REGISTER} className={styles.link}>
                  <Button color="inherit">{t('register.title')}</Button>
              </RouterLink>
          </span>
        )}
        <LanguageSelector/>
      </nav>
    </header>
  );
};

export {Header};
