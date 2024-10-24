import {Typography} from "@mui/material";

import { mockUsers } from "../../data/mockUsers";
import { IUser } from "../../models/IUser";
import {ProfileView} from "../common/ProfileView /ProfileView";

const UserProfile = () => {
    return (
        <ProfileView
            data={mockUsers}
            idKey="id"
            renderDetails={(user: IUser) => (
                <>
                    <Typography variant="h5">User Profile</Typography>
                    <Typography variant="body1">Name: {user.name}</Typography>
                </>
            )}
        />
    );
};

export { UserProfile };
