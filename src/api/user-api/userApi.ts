import {axiosInstance} from "../axios-instance";

import {ICreateUser, IUpdateUser, IUser, IUserListResponse} from "../../models/IUser";
import {urls} from "../../constants/urls";

const userApi = {
    getAllUsers: async (page = 1, pageSize = 10): Promise<IUserListResponse> => {
        const response = await axiosInstance.get(urls.users.getAllUsers, {params: {page, page_size: pageSize}});
        return response.data.result;
    },

    getUserById: async (userId: number): Promise<IUser> => {
        const response = await axiosInstance.get(urls.users.getById(userId));
        return response.data.result;
    },

    createUser: async (data: ICreateUser): Promise<IUser> => {
        const response = await axiosInstance.post(urls.users.createUser, data);
        return response.data.result;
    },

    updateUser: async (userId: number, data: IUpdateUser): Promise<IUser> => {
        const response = await axiosInstance.put(urls.users.updateUser(userId), data);
        return response.data.result;
    },

    deleteUser: async (userId: number): Promise<void> => {
        await axiosInstance.delete(urls.users.deleteUser(userId));
    }
};

export {userApi};
