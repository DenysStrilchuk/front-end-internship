import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

import {mockCompanies} from "../../data/mockCompanies";
import {ICompany} from "../../models/ICompany";
import {UserDetailsView} from "../common/UserDetailsView";


const CompanyProfile = () => {
    const {t} = useTranslation();

    return (
        <UserDetailsView
            data={mockCompanies}
            idKey="id"
            renderDetails={(company: ICompany) => (
                <>
                    <Typography variant="h4">{company.name}</Typography>
                    <Typography variant="body1">
                        {t('companies.details', {name: company.name})}
                    </Typography>
                </>
            )}
        />
    );
};


export {CompanyProfile};