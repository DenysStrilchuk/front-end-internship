import {mockUsers} from "../../data/mockUsers";
import {IUser} from "../../models/IUser";
import {ListView} from "../common/ListView";

const UsersList = () => {
    return (
        <ListView
            title="Users List"
            items={mockUsers}
            getItemLink={(user: IUser) => `/users/${user.id}`}
            renderItemName={(user: IUser) => user.name}
        />
    );
};

export {UsersList};
