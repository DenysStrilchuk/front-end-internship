import React from "react";
import {useTranslation} from "react-i18next";

import {mockCompanies} from "../../data/mockCompanies";
import {ICompany} from "../../models/ICompany";
import {UserDetailsView} from "../common/UserDetailsView";
import styles from "./CompanyProfile.module.css";

const CompanyProfile = () => {
    const {t} = useTranslation();

    return (
        <UserDetailsView
            data={mockCompanies}
            idKey="id"
            renderDetails={(company: ICompany) => (
                <span>
                    <h4 className={styles.title}>{company.name}</h4>
                    <p className={styles.description}>
                        {t('companies.details', {name: company.name})}
                    </p>
                </span>
            )}
        />
    );
};

export {CompanyProfile};
