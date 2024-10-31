import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../hooks';
import {selectTokenExpiration, authActions} from '../store/slices';
import {Routes} from "../utils/routes";

const useTokenExpiration = () => {
    const expirationDate = useAppSelector(selectTokenExpiration);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (expirationDate) {
            const interval = setInterval(() => {
                if (Date.now() >= expirationDate) {
                    dispatch(authActions.clearToken());
                    navigate(Routes.LOGIN);
                }
            }, 1000 * 60);

            return () => clearInterval(interval);
        }
    }, [expirationDate, dispatch, navigate]);
};

export {useTokenExpiration};
