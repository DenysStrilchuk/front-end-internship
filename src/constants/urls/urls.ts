const baseUrl = process.env.REACT_APP_API_URL;

const status = '/';
const register = '/user/';
const login = '/auth/login/';
const users = '/users/';
const user = '/user/';

const urls = {
    status: {
        base: `${baseUrl}${status}`
    },
    register: {
        base: `${baseUrl}${register}`
    },
    login: {
        base: `${baseUrl}${login}`
    },
    users: {
        getAllUsers: `${baseUrl}${users}`,
        getById: (id: number) => `${baseUrl}${user}${id}/`,
        createUser: `${baseUrl}${user}`,
        updateUser: (id: number) => `${baseUrl}${user}${id}/update_info/`,
        deleteUser: (id: number) => `${baseUrl}${user}${id}/`
    }
};

export {
    baseUrl,
    urls
};
