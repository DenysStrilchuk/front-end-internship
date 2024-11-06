import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../hooks';
import {selectTokenExpiration, authActions} from '../store/slices';

const useTokenExpiration = () => {
    const expirationDate = useAppSelector(selectTokenExpiration);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!expirationDate) return;

        const interval = setInterval(() => {
            if (Date.now() >= expirationDate) {
                clearInterval(interval);
                dispatch(authActions.clearToken());
            }
        }, 3600000);

        return () => clearInterval(interval);
    }, [expirationDate, dispatch]);
};

export {useTokenExpiration};
