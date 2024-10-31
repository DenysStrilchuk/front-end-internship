import { NavigateFunction } from "react-router-dom";
import {authActions} from "../../store/slices";
import {Routes} from "../routes";
import {AppDispatch} from "../../types/redux-types";

export const handleLogout = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(authActions.clearToken());
    localStorage.removeItem('token');
    navigate(Routes.LOGIN);
};
