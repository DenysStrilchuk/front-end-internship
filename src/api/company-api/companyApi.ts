import {axiosInstance} from "../axios-instance";

import {urls} from "../../constants/urls";
import {ICompaniesListResponse, ICompany} from "../../models/ICompany";

const companyApi = {
    getAllCompanies: async (page = 1, pageSize = 10): Promise<ICompaniesListResponse> => {
        const {data: {result}} = await axiosInstance.get(urls.companies.getAllCompanies, {params: {page, page_size: pageSize}});
        return result;
    },
    getCompanyById: async (companyId: number): Promise<ICompany> => {
        const {data: {result}} = await axiosInstance.get(urls.companies.getCompanyById(companyId));
        return result;
    },
    getCompaniesByUserId: async (userId: number): Promise<ICompaniesListResponse> => {
        const { data: { result } } = await axiosInstance.get(urls.companies.getUserCompanies(userId));
        return result;
    },
    createCompany: async (newCompany: { company_name: string; is_visible: boolean;}): Promise<{ company_id: number }> => {
        const {data: {result}} = await axiosInstance.post(urls.companies.createCompany, newCompany);
        return result;
    }
}

export {companyApi}