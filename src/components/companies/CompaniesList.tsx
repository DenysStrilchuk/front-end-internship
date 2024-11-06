import {useTranslation} from "react-i18next";

import {mockCompanies} from "../../data/mockCompanies";
import {ICompany} from "../../models/ICompany";
import {Routes} from "../../utils/routes";
import {CompaniesListView} from "../common/CompaniesListView";


const CompaniesList = () => {
    const {t} = useTranslation();

    return (
        <CompaniesListView
            title={t('companies.list')}
            items={mockCompanies}
            getItemLink={(company: ICompany) => `${Routes.COMPANIES}/${company.id}`}
            renderItem={(company: ICompany) => company.name}
            getItemId={(company) => company.id}
        />
    );
};

export {CompaniesList};