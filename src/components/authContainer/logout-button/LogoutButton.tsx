import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {useAppDispatch} from "../../../hooks";
import {handleLogout} from "../../../utils/logout-helper";
import styles from './LogoutButton.module.css';

const LogoutButton = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Button
      className={styles.logoutButton}
      color="inherit"
      onClick={() => handleLogout(dispatch, navigate)}
    >
      {t('logout')}
    </Button>
  );
};

export {LogoutButton};
