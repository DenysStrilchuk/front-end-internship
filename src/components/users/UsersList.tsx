import {useEffect} from "react";
import {useTranslation} from "react-i18next";

import {IUser} from "../../models/IUser";
import {ListView} from "../common/ListView";
import {Routes} from "../../utils";
import {useAppSelector, useAppDispatch} from "../../hooks";
import {fetchAllUsers} from "../../store/slices";

const UsersList = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch(); // Отримуємо dispatch
    const users = useAppSelector((state) => state.users.users);
    const loading = useAppSelector((state) => state.users.loading);
    const error = useAppSelector((state) => state.users.error);

    useEffect(() => {
        // Виклик fetchAllUsers при завантаженні компонента
        dispatch(fetchAllUsers({page: 1, pageSize: 10}));
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ListView
            title={t('user.list')}
            items={users}
            getItemLink={(user: IUser) => `${Routes.USERS}/${user.user_id}`}
            renderItemName={(user: IUser) => user.user_firstname}
        />
    );
};

export {UsersList};
