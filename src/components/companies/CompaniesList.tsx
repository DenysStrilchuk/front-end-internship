import {useTranslation} from "react-i18next";

import {mockCompanies} from "../../data/mockCompanies";
import {ICompany} from "../../models/ICompany";
import {UserListView} from "../common/UserListView";
import {Routes} from "../../utils";


const CompaniesList = () => {
    const {t} = useTranslation();

    return (
        <UserListView
            title={t('companies.list')}
            items={mockCompanies}
            getItemLink={(company: ICompany) => `${Routes.COMPANIES}/${company.id}`}
            renderItemName={(company: ICompany) => company.name}
        />
    );
};

export {CompaniesList};