import {axiosInstance} from "../axios-instance";

import {urls} from "../../constants/urls";
import {ILoginData, IRegistrationData, ITokenResponse, IUserIdResponse} from "../../types/api-types/authTypes";
import {IApiError} from "../../types/api-types/errorTypes";
import {tokenService} from "../token-service";

const authApi = {
    registerUser: async (data: IRegistrationData): Promise<IUserIdResponse> => {
        try {
            const response = await axiosInstance.post<IUserIdResponse>(urls.register.base, data);
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
            const response = await axiosInstance.post<ITokenResponse>(urls.login.base, data);
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
    }
};

export {authApi};
