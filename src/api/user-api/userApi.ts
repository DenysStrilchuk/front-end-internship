import {axiosInstance} from "../axios-instance";

import {IUpdateUser, IUser, IUserListResponse} from "../../models/IUser";
import {urls} from "../../constants/urls";
import {authApi} from "../auth-api";

const userApi = {
    getAllUsers: async (page = 1, pageSize = 10): Promise<IUserListResponse> => {
        const response = await axiosInstance.get(urls.users.getAllUsers, {params: {page, page_size: pageSize}});
        return response.data.result;
    },

    getUserById: async (userId: number): Promise<IUser> => {
        const response = await axiosInstance.get(urls.users.getById(userId));
        return response.data.result;
    },

    updateUser: async (userId: number, data: IUpdateUser): Promise<IUser> => {
        const currentUser = await authApi.getMe();
        if (currentUser.result.user_id !== userId) {
            throw new Error("You can only update your own information.");
        }
        await axiosInstance.put(urls.users.updateUser(userId), data);
        return await userApi.getUserById(userId);
    },

    updateAvatar: async (userId: number, file: File): Promise<IUser> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.put(urls.users.updateAvatar(userId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.result;
    },

    deleteUser: async (userId: number): Promise<void> => {
        const currentUser = await authApi.getMe();
        if (currentUser.result.user_id !== userId) {
            throw new Error("You can only delete your own account.");
        }
        await axiosInstance.delete(urls.users.deleteUser(userId));
    }
};

export {userApi};
