import {IPagination} from "./IUser";

export interface ICompany {
  company_id: number;
  company_name: string;
  company_title: string;
  company_avatar?: string;
  is_visible?: boolean;
  company_description?: string;
  company_city?: string;
  company_phone?: string;
  company_links?: string[];
  action_id?: number;
  action?: string;
  company_owner: {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string;
  };
}

export interface ICompaniesListResponse {
  companies: ICompany[];
  pagination: IPagination;
}

export interface IInviteCompany {
  company_id: number;
  company_name: string;
  company_title: string | null;
  company_avatar?: string;
  is_visible: boolean;
  action_id: number;
  action: string;
}

export interface IInviteCompaniesResponse {
  status_code: number;
  detail: string;
  result: {
    companies: IInviteCompany[];
  };
}
