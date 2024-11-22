import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

import styles from './RequestsFromUserList.module.css';
import {Loader} from '../../common/LoaderContainer';
import {fetchRequestsList} from '../../../store/slices';
import {cancelRequest} from "../../../store/slices/companySlice";

interface RequestsFromUserListProps {
  userId: number;
}

const RequestsFromUserList: React.FC<RequestsFromUserListProps> = ({userId}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {loading, invites: reduxInvites, error} = useAppSelector((state) => state.users);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [localInvites, setLocalInvites] = useState(reduxInvites);

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(fetchRequestsList(userId));
    }
  }, [dispatch, userId, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setLocalInvites(reduxInvites);
    }
  }, [reduxInvites, isOpen]);

  const toggleList = () => setIsOpen((prev) => !prev);

  const handleCancelRequest = async (actionId: number) => {
    try {
      await dispatch(cancelRequest(actionId)).unwrap();
      toast.success(t('requestsFromUserList.success.cancelRequest'));
      setLocalInvites((prev) => prev.filter((invite) => invite.action_id !== actionId));
    } catch {
      toast.error(t('requestsFromUserList.errors.failedToCancelRequest'));
    }
  };

  return (
    <div className={styles.container}>
      <h3 onClick={toggleList} className={styles.header}>
        {t('requestsFromUserList.title')}
      </h3>
      {isOpen && (
        <div>
          {loading && <Loader/>}
          {!loading && error && (
            <div className={styles.error}>
              <strong>{t(`requestsFromUserList.${error}`)}</strong>
            </div>
          )}
          {!loading && !error && localInvites?.length > 0 && (
            <ul className={styles.list}>
              {localInvites.map((invite) => (
                <li key={invite.company_id} className={styles.listItem}>
                  <span>{invite.company_name}</span>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleCancelRequest(invite.action_id)}
                  >
                    {t('requestsFromUserList.cancel')}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {!loading && !error && localInvites?.length === 0 && (
            <p className={styles.noRequests}>{t('requestsFromUserList.noRequests')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export {RequestsFromUserList};
