import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

import {mockUsers} from "../../data/mockUsers";
import {IUser} from "../../models/IUser";
import {ProfileView} from "../common/ProfileView /ProfileView";


const UserProfile = () => {
    const {t} = useTranslation();

    return (
        <ProfileView
            data={mockUsers}
            idKey="id"
            renderDetails={(user: IUser) => (
                <>
                    <Typography variant="h5">{t('user.profile')}</Typography>
                    <Typography variant="body1">{t('name')}: {user.name}</Typography>
                </>
            )}
        />
    );
};

export {UserProfile};
