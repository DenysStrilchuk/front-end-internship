import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchInvitesListToCompany} from "../../../store/slices";
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

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchInvitesListToCompany(userId));
    }
  }, [dispatch, userId, isOpen]);

  const toggleList = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t('invitesToCompanyList.companyInvites')}
      </h3>
      {isOpen && (
        <div>
          {loading && <Loader/>}
          {error &&
            <p className={styles.error}>{t(`invitesToCompanyList.error`)} {t(`invitesToCompanyList.${error}`)}</p>}
          {!loading && !error && (
            invites.length > 0 ? (
              <ul className={styles.list}>
                {invites.map((invite) => (
                  <li key={invite.company_id} className={styles.listItem}>
                    {invite.company_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noInvites}>{t(`invitesToCompanyList.noInvites`)}</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export {InvitesToCompanyList};
