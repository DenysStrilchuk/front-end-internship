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

export interface ITokenResult {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface ITokenResponse {
    status_code: number;
    detail: string;
    result: ITokenResult;
}
