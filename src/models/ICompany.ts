import {IPagination} from "./IUser";

export interface ICompany {
    company_id: number;
    company_name: string;
    company_title: string;
    company_avatar?: string;
    is_visible?: string;
    company_description?: string;
    company_city?: string;
    company_phone?: string;
    company_links?: string[];
}

export interface ICompaniesListResponse {
    companies: ICompany[];
    pagination: IPagination;
}