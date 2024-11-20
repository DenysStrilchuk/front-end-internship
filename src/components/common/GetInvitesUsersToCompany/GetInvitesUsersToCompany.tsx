import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@mui/material';
import {toast} from 'react-toastify';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {fetchInvitesList, cancelInvite} from '../../../store/slices/companySlice';
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
        t('getInvitesUsersToCompany.errors.failedToFetchInvitedUsers')
        ||
        t('getInvitesUsersToCompany.errors.unknown')
      );
    }
  }, [invitesError, t]);

  const handleCancelInvite = async (actionId: number) => {
    try {
      await dispatch(cancelInvite(actionId)).unwrap();
      toast.success(t('getInvitesUsersToCompany.success.cancelInvite'));
    } catch {
      toast.error(t('getInvitesUsersToCompany.errors.failedToCancelInvite'));
    }
  };

  const toggleList = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t('getInvitesUsersToCompany.title')}
      </h3>
      {isOpen && (
        <div>
          {loading && <Loader/>}
          {!loading && invitesError && (
            <div className={styles.error}>
              <strong>{t('getInvitesUsersToCompany.errors.error')}</strong> {errorMessage}
            </div>
          )}
          {!loading && !invitesError && invitedUsers?.users && invitedUsers.users.length > 0 && (
            <ul className={styles.list}>
              {invitedUsers.users.map((user) => (
                <li key={user.user_id} className={styles.listItem}>
                  <span>
                    {user.user_firstname} {user.user_lastname}
                  </span>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleCancelInvite(user.action_id!)}
                  >
                    {t('getInvitesUsersToCompany.actions.cancelInvite')}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {!loading && !invitesError && invitedUsers?.users?.length === 0 && (
            <p className={styles.noUsers}>{t('getInvitesUsersToCompany.noUsers')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export {GetInvitesUsersToCompany};
