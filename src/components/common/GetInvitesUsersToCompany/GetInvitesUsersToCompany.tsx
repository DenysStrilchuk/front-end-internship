import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {fetchInvitesList} from '../../../store/slices/companySlice';
import {Loader} from '../LoaderContainer';
import styles from './GetInvitesUsersToCompany.module.css';

interface GetInvitesUsersToCompanyProps {
  companyId: number;
}

const GetInvitesUsersToCompany: React.FC<GetInvitesUsersToCompanyProps> = ({companyId}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {loading, invitedUsers, invitesError} = useAppSelector((state) => state.companies);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && companyId) {
      dispatch(fetchInvitesList(companyId));
    }
  }, [dispatch, companyId, isOpen]);

  useEffect(() => {
    if (invitesError) {
      setErrorMessage(
        t('getInvitesUsersToCompany.errors.failedToFetchInvitedUsers') || t('getInvitesUsersToCompany.errors.unknown'));
    }
  }, [invitesError, t]);

  const toggleList = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t('getInvitesUsersToCompany.title')}
      </h3>
      {isOpen && (
        <div>
          {loading ? (
            <Loader/>
          ) : invitesError ? (
            <div className={styles.error}>
              <strong>{t('getInvitesUsersToCompany.errors.error')}</strong> {errorMessage}
            </div>
          ) : invitedUsers?.users && invitedUsers.users.length > 0 ? (
            <ul className={styles.list}>
              {invitedUsers.users.map((user) => (
                <li key={user.user_id} className={styles.listItem}>
                  {user.user_firstname} {user.user_lastname}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noUsers}>No invited users</p>
          )}
        </div>
      )}
    </div>
  );
};

export {GetInvitesUsersToCompany};
