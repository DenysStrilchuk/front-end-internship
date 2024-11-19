import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {Loader} from '../../common/LoaderContainer';
import {fetchUserCompanies} from '../../../store/slices/companySlice';
import styles from './UserCompaniesList.module.css';
import {Routes} from "../../../utils/routes";

interface UserCompaniesListProps {
  userId: number;
}

const UserCompaniesList: React.FC<UserCompaniesListProps> = ({userId}) => {
  const dispatch = useAppDispatch();
  const {companies, loading, error} = useAppSelector((state) => state.companies);
  const {t} = useTranslation();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserCompanies(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className={styles.container}>
      <h3>{t('userCompanies.title')}</h3>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader/>
        </div>
      ) : error ? (
        <div className={styles.error}>
          {t(`userCompanies.error.${error}`)}
        </div>
      ) : companies.length ? (
        <ul>
          {companies.map((company) => (
            <li key={company.company_id}>
              <Link to={`${Routes.COMPANY}/${company.company_id}`}>
                <strong>{company.company_name}</strong>
              </Link>
              {!company.is_visible && (
                <span className={styles.hiddenText}> {t('userCompanies.hidden')}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('userCompanies.noCompanies')}</p>
      )}
    </div>
  );
};

export {UserCompaniesList};
