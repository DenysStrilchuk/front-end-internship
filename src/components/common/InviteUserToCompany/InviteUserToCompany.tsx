import React, {useEffect, useState} from 'react';
import {Avatar, Button} from '@mui/material';
import {useTranslation} from "react-i18next";
import {toast} from 'react-toastify';

import {fetchAllUsers} from "../../../store/slices";
import {inviteUser} from "../../../store/slices/companySlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IUser} from '../../../models/IUser';
import styles from './InviteUserToCompany.module.css';
import {Pagination} from "../Pagination";
import {Loader} from "../LoaderContainer";

interface InviteUserToCompanyProps {
  companyId: number;
  onClose: () => void;
}

const InviteUserToCompany: React.FC<InviteUserToCompanyProps> = ({companyId, onClose}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const {users, loading, error, pagination} = useAppSelector((state) => state.users);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchAllUsers({page: currentPage, pageSize}));
  }, [dispatch, currentPage]);

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prevSelected) => {
      const updated = new Set(prevSelected);
      updated.has(userId) ? updated.delete(userId) : updated.add(userId);
      return updated;
    });
  };

  const handleAddSelectedUsers = async () => {
    try {
      await Promise.all(Array.from(selectedUsers).map(userId => dispatch(inviteUser({companyId, userId})).unwrap()));
      toast.success(t('inviteUserToCompany.success'));
      setSelectedUsers(new Set());
      onClose();
    } catch (err) {
      const message = t(`inviteUserToCompany.error.${err}`) || t('inviteUserToCompany.error.unknown');
      toast.error(message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {loading && <Loader/>}
      {!loading && error && <p>{t('inviteUserToCompany.error.fetchUsers')}</p>}
      {!loading && !error && (
        <>
          <div className={styles.userList}>
            {users.map((user: IUser) => (
              <div key={user.user_id} className={styles.userItem}>
                <Avatar
                  src={user.user_avatar}
                  alt={`${user.user_firstname} ${user.user_lastname}`}
                  className={styles.avatar}
                />
                <span className={styles.userName}>{`${user.user_firstname} ${user.user_lastname}`}</span>
                <div className={styles.selectButtonContainer}>
                  <Button
                    onClick={() => handleSelectUser(user.user_id)}
                    className={styles.selectButton}
                    variant={selectedUsers.has(user.user_id) ? "contained" : "outlined"}
                  >
                    {selectedUsers.has(user.user_id)
                      ? t('inviteUserToCompany.selected')
                      : t('inviteUserToCompany.select')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {selectedUsers.size > 0 && (
            <div className={styles.addSelectedButtonContainer}>
              <Button
                onClick={handleAddSelectedUsers}
                className={styles.addSelectedButton}
                variant="contained"
                color="primary"
              >
                {t('inviteUserToCompany.addSelectedUsers')}
              </Button>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPage={pagination?.total_page || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export {InviteUserToCompany};
