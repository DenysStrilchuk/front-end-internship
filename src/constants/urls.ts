const baseUrl = process.env.REACT_APP_API_URL;

const status = '/';
const register = '/user/';
const login = '/auth/login/';

const urls = {
    status: {
        base: status
    },
    register: {
        base: register
    },
    login: {
        base: login
    }
}

export {
    baseUrl,
    urls
}