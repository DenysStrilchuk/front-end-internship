import {axiosInstance} from "../axios-instance";

import {urls} from "../../constants/urls";
import {ICompaniesListResponse, ICompany} from "../../models/ICompany";

const companyApi = {
    getAllCompanies: async (page = 1, pageSize = 10): Promise<ICompaniesListResponse> => {
        const {data: {result}} = await axiosInstance.get(urls.companies.getAllCompanies, {params: {page, page_size: pageSize}});
        return result;
    },
    getCompanyById: async (userId: number): Promise<ICompany> => {
        const {data: {result}} = await axiosInstance.get(urls.companies.getCompanyById(userId));
        return result;
    }
}

export {companyApi}