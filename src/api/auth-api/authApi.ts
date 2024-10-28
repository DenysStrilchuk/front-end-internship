import { axiosInstance } from "../axios-instance";
import { urls } from "../../constants/urls";
import { ILoginData, IRegistrationData, ITokenResponse, IUserIdResponse } from "../../types/api-types/authTypes";

const authApi = {
    registerUser: async (data: IRegistrationData): Promise<IUserIdResponse> => {
        try {
            const response = await axiosInstance.post<IUserIdResponse>(urls.register.base, data);
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },
    loginUser: async (data: ILoginData): Promise<ITokenResponse> => {
        try {
            const response = await axiosInstance.post<ITokenResponse>(urls.login.base, data);

            // Save token to localStorage
            localStorage.setItem('token', JSON.stringify(response.data.result));

            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
};

export { authApi };
