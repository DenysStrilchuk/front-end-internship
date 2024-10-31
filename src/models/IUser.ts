export interface IUser {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar?: string;
    user_status?: string;
    user_city?: string;
    user_phone?: string;
    user_links?: string[];
    is_superuser?: boolean;
}

export interface IGetMeResponse {
    status_code: number;
    detail: string;
    result: IUser;
}


export interface IPagination {
    current_page: number;
    total_page: number;
    total_results: number;
}

export interface IUserListResponse {
    users: IUser[];
    pagination: IPagination;
}

export interface IUpdateUser {
    user_firstname?: string;
    user_lastname?: string;
    user_status?: string;
    user_city?: string;
    user_phone?: string;
    user_links?: string[];
}
