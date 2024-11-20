import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button} from '@mui/material';

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loader} from "../../common/LoaderContainer";
import {fetchRequestsList, acceptRequest, cancelRequest} from "../../../store/slices/companySlice";
import {IUser} from "../../../models/IUser";
import styles from './CompanyRequestsList.module.css';

interface CompanyRequestsListProps {
  companyId: number;
}

const CompanyRequestsList: React.FC<CompanyRequestsListProps> = ({companyId}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {requestsList, loading, error, invitedError} = useAppSelector((state) => state.companies);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchRequestsList(companyId));
    }
  }, [dispatch, companyId, isOpen]);

  const toggleList = () => setIsOpen((prev) => !prev);

  const handleAcceptRequest = (actionId: number) => {
    dispatch(acceptRequest(actionId));
  };

  const handleCancelRequest = (actionId: number) => {
    dispatch(cancelRequest(actionId));
  };

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
          {invitedError && (
            <p className={styles.error}>
              {t(`companyRequestsList.${invitedError}`) || t('companyRequestsList.errors.unknownError')}
            </p>
          )}
          {!loading && !error && !invitedError && (
            <div>
              {requestsList && requestsList.users.length > 0 && (
                <ul className={styles.list}>
                  {requestsList.users.map((request: IUser) => (
                    <li key={request.user_id} className={styles.listItem}>
                      <span>{request.user_firstname} {request.user_lastname}</span>
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => request.action_id !== undefined && handleAcceptRequest(request.action_id)}
                          sx={{marginLeft: 2}}
                        >
                          {t('companyRequestsList.accept')}
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => request.action_id !== undefined && handleCancelRequest(request.action_id)}
                          sx={{marginLeft: 2}}
                        >
                          {t('companyRequestsList.cancelInvite')}
                        </Button>
                      </div>
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
