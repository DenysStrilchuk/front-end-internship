import {axiosInstance} from "../axios-instance";

import {IAcceptInviteResponse, IUpdateUser, IUser, IUserListResponse} from "../../models/IUser";
import {urls} from "../../constants/urls";
import {IActionIdResponse, ICompaniesListResponse, IInviteCompaniesResponse} from "../../models/ICompany";

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
  },
  getInvitesList: async (userId: number): Promise<IInviteCompaniesResponse> => {
    const {data} = await axiosInstance.get(urls.users.getInvitesToCompanies(userId));
    return data;
  },
  inviteFromUserToCompany: async (companyId: number): Promise<IActionIdResponse> => {
    const {data} = await axiosInstance.get(urls.users.actionCreateFromUser(companyId));
    return data;
  },
  acceptInvite: async (actionId: number): Promise<IAcceptInviteResponse> => {
    const { data } = await axiosInstance.get(urls.actions.acceptInvite(actionId));
    return data;
  },
  declineInvite: async (actionId: number): Promise<ICompaniesListResponse> => {
    const {data: {result}} = await axiosInstance.get(urls.actions.declineInvite(actionId));
    return result;
  }
};

export {userApi};
