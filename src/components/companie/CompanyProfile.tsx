import {Typography} from "@mui/material";

import { mockCompanies } from "../../data/mockCompanies";
import { ICompany } from "../../models/ICompany";
import {ProfileView} from "../common/ProfileView /ProfileView";

const CompanyProfile = () => {
    return (
        <ProfileView
            data={mockCompanies}
            idKey="id"
            renderDetails={(company: ICompany) => (
                <>
                    <Typography variant="h4">{company.name}</Typography>
                    <Typography variant="body1">Details about {company.name}...</Typography>
                </>
            )}
        />
    );
};

export { CompanyProfile };
