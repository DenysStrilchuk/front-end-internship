import axios, {AxiosInstance} from 'axios';

import {baseUrl} from "../../constants/urls";
import {store} from "../../store";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('Error in response:', error);
        return Promise.reject(error);
    }
);

export {axiosInstance};
