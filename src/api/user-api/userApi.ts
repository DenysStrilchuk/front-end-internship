import {axiosInstance} from "../axios-instance";

import {IUpdateUser, IUser, IUserListResponse} from "../../models/IUser";
import {urls} from "../../constants/urls";

const userApi = {
    getAllUsers: async (page = 1, pageSize = 10): Promise<IUserListResponse> => {
        const {data: {result}} = await axiosInstance.get(urls.users.getAllUsers, {params: {page, page_size: pageSize}});
        return result;
    },
    getUserById: async (userId: number): Promise<IUser> => {
        const {data: {result}} = await axiosInstance.get(urls.users.getById(userId));
        return result;
    },
    updateUser: async (userId: number, data: IUpdateUser): Promise<IUser> => {
        const {data: responseData} = await axiosInstance.put(urls.users.updateUser(userId), data);
        return responseData;
    },
    updateAvatar: async (userId: number, file: File): Promise<IUser> => {
        const formData = new FormData();
        formData.append('file', file);

        const {data: {result}} = await axiosInstance.put(urls.users.updateAvatar(userId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return result;
    },
    deleteUser: async (userId: number): Promise<void> => {
        await axiosInstance.delete(urls.users.deleteUser(userId));
    }
};

export {userApi};
