const baseUrl = process.env.REACT_APP_API_URL;

const status = '/';
const register = '/user/';
const login = '/auth/login/';
const getMe = '/auth/me/';
const users = '/users/';
const user = '/user/';
const updateInfo = '/update_info/';
const updateAvatar = '/update_avatar/';
const companies = '/companies/';
const company = '/company/';
const companiesList = '/companies_list/';
const updateVisible = '/update_visible/';
const invitesList = '/invites_list/';
const requestsList = '/requests_list/';
const membersList = '/members_list/';
const action = '/action/';
const createFromCompany = 'create_from_company/';
const createFromUser = 'create_from_user';
const declineAction = '/decline_action/';
const acceptRequest = '/accept_request/';
const acceptInvite = '/accept_invite/';
const leaveCompany = '/leave_company/';

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
    getInvitesToCompanies: (userId: number) => `${user}${userId}${invitesList}`,
    actionCreateFromUser: (companyId: number) => `${action}${createFromUser}${company}${companyId}/`,
    getRequestsList: (userId: number) => `${user}${userId}${requestsList}`,
  },
  companies: {
    getAllCompanies: `${companies}`,
    getCompanyById: (id: number) => `${company}${id}/`,
    getUserCompanies: (userId: number) => `${user}${userId}${companiesList}`,
    createCompany: `${company}`,
    updateCompanyInfo: (companyId: number) => `${company}${companyId}${updateInfo}`,
    updateVisible: (companyId: number) => `${company}${companyId}${updateVisible}`,
    updateAvatar: (companyId: number) => `${company}${companyId}${updateAvatar}`,
    deleteCompany: (companyId: number) => `${company}${companyId}/`,
    getInvitesList: (companyId: number) => `${company}${companyId}${invitesList}`,
    actionCreateFromCompany: (companyId: number, userId: number) => `${action}${createFromCompany}${companyId}${user}${userId}/`,
    getRequestsList: (companyId: number) => `${company}${companyId}${requestsList}`,
    getMembersList: (companyId: number) => `${company}${companyId}${membersList}`,
  },
  actions: {
    acceptInvite: (actionId: number) => `${action}${actionId}${acceptInvite}`,
    acceptRequest: (actionId: number) => `${action}${actionId}${acceptRequest}`,
    declineInvite: (actionId: number) => `${action}${actionId}${declineAction}`,
    leaveCompany: (actionId: number) => `${action}${actionId}${leaveCompany}`
  }
};

export {
  baseUrl,
  urls
};
