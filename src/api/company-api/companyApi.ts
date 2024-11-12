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
        const {data: {result}} = await axiosInstance.get(urls.companies.getUserCompanies(userId));
        return result;
    },
    createCompany: async (newCompany: { company_name: string; is_visible: boolean;}): Promise<{ company_id: number }> => {
        const {data: {result}} = await axiosInstance.post(urls.companies.createCompany, newCompany);
        return result;
    },
    updateCompany: async (companyId: number, updateData: Partial<ICompany>): Promise<ICompany> => {
        const {data: {result}} = await axiosInstance.put(urls.companies.updateCompanyInfo(companyId), updateData);
        return result;
    },
    updateCompanyVisibility: async (companyId: number, isVisible: boolean): Promise<ICompany> => {
        const {data: {result}} = await axiosInstance.put(urls.companies.updateVisible(companyId), {is_visible: isVisible});
        return result;
    },
    updateCompanyAvatar: async (companyId: number, file: File): Promise<ICompany> => {
        const formData = new FormData();
        formData.append('file', file);
        const {data: {result}} = await axiosInstance.put(
            urls.companies.updateAvatar(companyId),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return result;
    }
}

export {companyApi}