const baseUrl = process.env.REACT_APP_API_URL;

const status = '/';
const register = '/user/';
const login = '/auth/login/';
const getMe = '/auth/me/';
const users = '/users/';
const user = '/user/';
const updateInfo = '/update_info/';
const updateAvatar = '/update_avatar/';

const urls = {
    status: {
        base: `${baseUrl}${status}`
    },
    auth: {
        register: `${baseUrl}${register}`,
        login: `${baseUrl}${login}`,
        getMe: `${baseUrl}${getMe}`
    },
    users: {
        getAllUsers: `${baseUrl}${users}`,
        getById: (id: number) => `${baseUrl}${user}${id}/`,
        createUser: `${baseUrl}${user}`,
        updateUser: (id: number) => `${baseUrl}${user}${id}${updateInfo}`,
        updateAvatar: (userId: number) => `${user}${userId}${updateAvatar}`,
        deleteUser: (id: number) => `${baseUrl}${user}${id}/`,
    },
};

export {
    baseUrl,
    urls
};
