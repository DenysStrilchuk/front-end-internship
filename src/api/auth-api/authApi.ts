import {axiosInstance} from "../axios-instance";

import {urls} from "../../constants/urls";
import {ILoginData, IRegistrationData, ITokenResponse, IUserIdResponse} from "../../types/api-types/authTypes";
import {IApiError} from "../../types/api-types/errorTypes";
import {tokenService} from "../token-service";
import {IGetMeResponse} from "../../models/IUser";

const authApi = {
    registerUser: async (data: IRegistrationData): Promise<IUserIdResponse> => {
        try {
            const response = await axiosInstance.post<IUserIdResponse>(urls.auth.register, data);
            return response.data;
        } catch (error: unknown) {
            const apiError = error as IApiError;
            if (apiError.response && apiError.response.status === 400) {
                const errorMessage = apiError.response.data?.message || "User with this email address already exists.";
                throw new Error(errorMessage);
            }
            console.error("Registration error:", error);
            throw error;
        }
    },
    loginUser: async (data: ILoginData): Promise<ITokenResponse> => {
        try {
            const response = await axiosInstance.post<ITokenResponse>(urls.auth.login, data);
            tokenService.saveToken(response.data.result);
            return response.data;
        } catch (error) {
            const apiError = error as IApiError;
            if (apiError.response && apiError.response.status === 401) {
                throw new Error("Invalid login or password.");
            }
            console.error("Login error:", error);
            throw error;
        }
    },
    getMe: async (): Promise<IGetMeResponse> => {
        try {
            const response = await axiosInstance.get<IGetMeResponse>(urls.auth.getMe);
            return response.data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    }

};

export {authApi};
