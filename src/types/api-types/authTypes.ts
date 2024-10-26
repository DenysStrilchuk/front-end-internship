export interface IRegistrationData {
    user_password: string;
    user_password_repeat: string;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
}

export interface ILoginData {
    user_email: string;
    user_password: string;
}

export interface IUserIdResponse {
    userId: string;
}

export interface ITokenResponse {
    token: string;
}
