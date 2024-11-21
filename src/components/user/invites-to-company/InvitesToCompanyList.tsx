import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button} from '@mui/material';

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchInvitesListToCompany, acceptInvite, cancelInvite} from "../../../store/slices";
import {Loader} from "../../common/LoaderContainer";
import styles from './InvitesToCompanyList.module.css';

interface InvitesToCompanyListProps {
  userId: number;
}

const InvitesToCompanyList: React.FC<InvitesToCompanyListProps> = ({userId}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {invites, loading, error} = useAppSelector((state) => state.users);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchInvitesListToCompany(userId));
    }
  }, [dispatch, userId, isOpen]);

  const toggleList = () => setIsOpen((prev) => !prev);

  const handleAcceptInvite = async (actionId: number) => {
    try {
      await dispatch(acceptInvite(actionId)).unwrap();
    } catch {
      setAcceptError(t("invitesToCompanyList.acceptError"));
    }
  };

  const handleCancelInvite = async (actionId: number) => {
    try {
      await dispatch(cancelInvite(actionId)).unwrap();
    } catch {
      setCancelError(t(`invitesToCompanyList.cancelError`));
    }
  };

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t('invitesToCompanyList.companyInvites')}
      </h3>
      {isOpen && (
        <div>
          {loading && <Loader/>}
          {error && (
            <p className={styles.error}>
              {t(`invitesToCompanyList.${error}`)}
            </p>
          )}
          {!loading && !error && (
            invites.length > 0 ? (
              <ul className={styles.list}>
                {invites.map((invite) => (
                  <li key={invite.company_id} className={styles.listItem}>
                    <div className={styles.companyName}>{invite.company_name}</div>
                    <div className={styles.buttons}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAcceptInvite(invite.action_id)}
                      >
                        {t("invitesToCompanyList.accept")}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancelInvite(invite.action_id)}
                      >
                        {t("invitesToCompanyList.cancel")}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noInvites}>{t("invitesToCompanyList.noInvites")}</p>
            )
          )}
          {acceptError && <p className={styles.error}>{acceptError}</p>}
          {cancelError && <p className={styles.error}>{cancelError}</p>}
        </div>
      )}
    </div>
  );
};

export {InvitesToCompanyList};
