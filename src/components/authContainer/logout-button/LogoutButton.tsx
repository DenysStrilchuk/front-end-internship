import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../../hooks";
import { authActions } from "../../../store/slices";
import { Routes } from "../../../utils";

const LogoutButton = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.clearToken());
        navigate(Routes.LOGIN);
    };

    return (
        <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
                marginLeft: 2,
                borderRadius: 2,
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
            }}
        >
            {t('logout')}
        </Button>
    );
};

export { LogoutButton };
