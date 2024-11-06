import { NavigateFunction } from "react-router-dom";

import {authActions} from "../../store/slices";
import {Routes} from "../routes";
import {AppDispatch} from "../../types/redux-types";
import {tokenService} from "../../api/token-service";

export const handleLogout = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(authActions.clearToken());
    tokenService.removeToken();
    navigate(Routes.LOGIN);
};
