import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./reduxHooks";
import {authActions} from "../store/slices/authSlice";

const useAuthCheck = () => {
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            dispatch(authActions.clearToken());
            navigate('/login');
        }
    }, [token, dispatch, navigate]);
};

export {useAuthCheck}