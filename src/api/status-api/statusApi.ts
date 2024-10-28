import { axiosInstance } from "../axios-instance";
import { IHealthCheckResponse } from "../../types/api-types";
import {urls} from "../../constants/urls";

export const checkStatus = async (): Promise<IHealthCheckResponse> => {
    try {
        const {data} = await axiosInstance.get<IHealthCheckResponse>(urls.status.base);
        return data;
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
};
