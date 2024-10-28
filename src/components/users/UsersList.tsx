import { useTranslation } from "react-i18next";

import { mockUsers } from "../../data/mockUsers";
import { IUser } from "../../models/IUser";
import { ListView } from "../common/ListView";
import { Routes } from "../../utils";

const UsersList = () => {
    const { t } = useTranslation();

    return (
        <ListView
            title={t('user.list')}
            items={mockUsers}
            getItemLink={(user: IUser) => `${Routes.USERS}/${user.id}`}
            renderItemName={(user: IUser) => user.name}
        />
    );
};

export { UsersList };


