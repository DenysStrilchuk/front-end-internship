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
        base: `${status}`
    },
    auth: {
        register: `${register}`,
        login: `${login}`,
        getMe: `${getMe}`
    },
    users: {
        getAllUsers: `${users}`,
        getById: (id: number) => `${user}${id}/`,
        updateUser: (id: number) => `${user}${id}${updateInfo}`,
        updateAvatar: (userId: number) => `${user}${userId}${updateAvatar}`,
        deleteUser: (id: number) => `${user}${id}/`,
    },
};

export {
    baseUrl,
    urls
};
