import {useTranslation} from "react-i18next";

import {mockUsers} from "../../data/mockUsers";
import {IUser} from "../../models/IUser";
import {ListView} from "../common/ListView";


const UsersList = () => {
    const {t} = useTranslation();

    return (
        <ListView
            title={t('users_list')}
            items={mockUsers}
            getItemLink={(user: IUser) => `/users/${user.id}`}
            renderItemName={(user: IUser) => user.name}
        />
    );
};

export {UsersList};
