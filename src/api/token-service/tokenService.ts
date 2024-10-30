import {ITokenResult} from "../../types/api-types/authTypes";

const TOKEN_KEY = 'token';

const tokenService = {
    saveToken: (tokenData: ITokenResult) => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
    },
    getToken: () => {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        return savedToken ? JSON.parse(savedToken) : null;
    },
    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
    }
};

export {tokenService}
