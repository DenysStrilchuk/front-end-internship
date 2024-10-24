import {useTranslation} from "react-i18next";

import {mockCompanies} from "../../data/mockCompanies";
import {ICompany} from "../../models/ICompany";
import {ListView} from "../common/ListView";
import {Routes} from "../../utils/routes";


const CompaniesList = () => {
    const {t} = useTranslation();

    return (
        <ListView
            title={t('companies_list')}
            items={mockCompanies}
            getItemLink={(company: ICompany) => `${Routes.COMPANIES}/${company.id}`}
            renderItemName={(company: ICompany) => company.name}
        />
    );
};

export {CompaniesList};
