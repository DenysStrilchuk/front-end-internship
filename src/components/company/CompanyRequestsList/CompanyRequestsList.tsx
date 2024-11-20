import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loader} from "../../common/LoaderContainer";
import styles from './CompanyRequestsList.module.css';
import {fetchRequestsList} from "../../../store/slices/companySlice";
import {IUser} from "../../../models/IUser";

interface CompanyRequestsListProps {
  companyId: number;
}

const CompanyRequestsList: React.FC<CompanyRequestsListProps> = ({companyId}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {requestsList, loading, error} = useAppSelector((state) => state.companies);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchRequestsList(companyId));
    }
  }, [dispatch, companyId, isOpen]);

  const toggleList = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t('companyRequestsList.title')}
      </h3>
      {isOpen && (
        <div>
          {loading && <Loader/>}
          {error && (
            <p className={styles.error}>
              {t(`companyRequestsList.${error}`) || t('companyRequestsList.errors.unknownError')}
            </p>
          )}
          {!loading && !error && (
            <div>
              {requestsList && requestsList.users.length > 0 && (
                <ul className={styles.list}>
                  {requestsList.users.map((request: IUser) => (
                    <li key={request.user_id} className={styles.listItem}>
                      {request.user_firstname} {request.user_lastname}
                    </li>
                  ))}
                </ul>
              )}
              {requestsList && requestsList.users.length === 0 && (
                <p className={styles.noRequests}>
                  {t('companyRequestsList.noRequests')}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export {CompanyRequestsList};
