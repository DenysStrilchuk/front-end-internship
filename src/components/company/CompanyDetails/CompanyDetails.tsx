import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import {ICompany} from "../../../models/ICompany";
import {DetailsView} from "../../common/DetailsView";
import styles from "./CompanyDetails.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchCompanyById} from "../../../store/slices/companySlice";
import {Loader} from "../../common/LoaderContainer";

const CompanyDetails = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const {companyDetail: company, loading, error} = useAppSelector((state) => state.companies);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {loading && <Loader/>}
      {!loading && error && (
        <p className={styles.errorText}>
          {t("company.error")}
        </p>
      )}
      {!loading && !company && !error && (
        <p className={styles.errorText}>
          {t("company.notFound")}
        </p>
      )}
      {!loading && company && (
        <DetailsView
          data={[company]}
          idKey="company_id"
          renderDetails={(company: ICompany) => (
            <div className={styles.profileContainer}>
              <div className={styles.profileSideBar}>
                {company.company_avatar && (
                  <img
                    src={company.company_avatar}
                    alt={`${company.company_name}`}
                    className={styles.avatar}
                  />
                )}
                <div className={styles.divider}></div>
              </div>
              <div className={styles.mainContent}>
                <h4 className={styles.title}>{company.company_name}</h4>
                <div className={styles.divider}></div>
                <p className={styles.description}>
                  {company.company_description || t('company.noDescriptionAvailable')}
                </p>
                <div className={styles.divider}></div>
                <p><strong>{t('company.city')}: </strong>
                  {company.company_city || t('company.unknown')}
                </p>
                <p>
                  <strong>{t('company.phone')}: </strong>
                  {company.company_phone || t('company.notProvided')}
                </p>
                <div>
                  <strong>{t('company.links')}: </strong>
                  {company.company_links && company.company_links.length > 0 ? (
                    <ul>
                      {company.company_links.map((link) => (
                        <li key={company.company_id}>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>{t('company.noLinksAvailable')}</span>
                  )}
                  <div className={styles.divider}></div>
                  {company.company_owner && (
                    <div className={styles.ownerInfo}>
                      <h3>{t('company.ownerInfo')}</h3>
                      {company.company_owner.user_avatar && (
                        <img
                          src={company.company_owner.user_avatar}
                          alt={`
                            ${company.company_owner.user_firstname} 
                            ${company.company_owner.user_lastname}
                          `}
                          className={styles.ownerAvatar}
                        />
                      )}
                      <p>
                        <strong>{t('company.ownerName')}: </strong>
                        {company.company_owner.user_firstname}
                        {company.company_owner.user_lastname}
                      </p>
                      <p>
                        <strong>{t('company.ownerEmail')}: </strong>
                        {company.company_owner.user_email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
};

export {CompanyDetails};
