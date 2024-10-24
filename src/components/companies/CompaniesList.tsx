import {mockCompanies} from "../../data/mockCompanies";
import {ICompany} from "../../models/ICompany";
import {ListView} from "../common/ListView";

const CompaniesList = () => {
    return (
        <ListView
            title="Companies List"
            items={mockCompanies}
            getItemLink={(company: ICompany) => `/companies/${company.id}`}
            renderItemName={(company: ICompany) => company.name}
        />
    );
};

export {CompaniesList};
