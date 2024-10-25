import axios, { AxiosInstance } from 'axios';

import {baseUrl} from "../../constants";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('Error in response:', error);
        return Promise.reject(error);
    }
);

export { axiosInstance };
