import {axiosInstance} from "../axios-instance";

import {urls} from "../../constants/urls";
import {ILoginData, IRegistrationData, ITokenResponse, IUserIdResponse} from "../../types/api-types/authTypes";
import {IApiError} from "../../types/api-types/errorTypes";
import {tokenService} from "../token-service";
import {IGetMeResponse} from "../../models/IUser";

const authApi = {
    registerUser: async (data: IRegistrationData): Promise<IUserIdResponse> => {
        try {
            const {data: responseData} = await axiosInstance.post<IUserIdResponse>(urls.auth.register, data);
            return responseData;
        } catch (error: unknown) {
            const {response} = error as IApiError;
            if (response && response.status === 400) {
                const errorMessage = response.data?.message || "User with this email address already exists.";
                throw new Error(errorMessage);
            }
            throw new Error("An unexpected error occurred during registration.");
        }
    },
    loginUser: async (data: ILoginData): Promise<ITokenResponse> => {
        try {
            const {data: responseData} = await axiosInstance.post<ITokenResponse>(urls.auth.login, data);
            tokenService.saveToken(responseData.result);
            return responseData;
        } catch (error) {
            const apiError = error as IApiError;
            if (apiError.response && apiError.response.status === 401) {
                throw new Error("Invalid login or password.");
            }
            throw new Error("An unexpected error occurred during login");
        }
    },
    getMe: async (): Promise<IGetMeResponse> => {
        const { data: responseData } = await axiosInstance.get<IGetMeResponse>(urls.auth.getMe);
        return responseData;
    }
};

export {authApi};
