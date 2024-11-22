import React, {useEffect, useState} from 'react';
import {Avatar, Button} from '@mui/material';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getMe, selectIsAuthenticated} from "../../../store/slices";
import {UserUpdateForm} from "../../common/UserUpdateForm";
import {UserDeleteForm} from "../../common/UserDeleteForm";
import {UpdateAvatar} from "../../common/UpdateAvatar";
import {UniversalModal} from "../../common/UniversalModal";
import styles from './UserProfile.module.css';
import {Loader} from "../../common/LoaderContainer";
import {CreateCompanyForm} from "../../common/CreateCompanyForm";
import {UserCompaniesList} from "../../companies/UserCompaniesList";
import {fetchUserCompanies} from "../../../store/slices/companySlice";
import {InvitesToCompanyList} from "../invites-to-company";
import {InviteFromUserToCompany} from "../invite-from-user";
import {RequestsFromUserList} from "../requests-from-user";

const UserProfile = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [showAvatarForm, setShowAvatarForm] = useState<boolean>(false);
  const [showCreateCompanyForm, setShowCreateCompanyForm] = useState<boolean>(false);
  const [showInviteForm, setShowInviteForm] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getMe()).unwrap().catch((err) => setError(err));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleUpdateSuccess = () => {
    dispatch(getMe())
    setShowUpdateForm(false);
  };

  const handleCreateCompanySuccess = () => {
    if (user?.result.user_id) {
      dispatch(fetchUserCompanies(user.result.user_id));
    }
    setShowCreateCompanyForm(false);
  };

  const handleInviteSuccess = () => {
    setShowInviteForm(false);
  };

  if (!user && error) {
    return <div className={styles.alert}>{t(error)}</div>;
  }

  if (!user) {
    return <Loader/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileSideBar}>
          <Avatar
            src={`${user.result.user_avatar}?timestamp=${Date.now()}`}
            alt={t('profile.userAvatar')}
            className={styles.avatar}
            sx={{width: 150, height: 150, border: '4px solid #1976d2'}}
          />
          <div className={styles.divider}></div>
          <div className={styles.buttonsContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowUpdateForm(true)}
            >
              {t('profile.updateProfile')}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowDeleteForm(true)}
            >
              {t('profile.deleteProfile')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAvatarForm(true)}
            >
              {t('profile.uploadAvatar')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCreateCompanyForm(true)}
            >
              {t('profile.createCompany')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowInviteForm(true)}
            >
              {t('profile.inviteToCompany')}
            </Button>
          </div>
        </div>
        <div className={styles.mainContent}>
          <h2>{user.result.user_firstname} {user.result.user_lastname}</h2>
          <div className={styles.divider}></div>
          <div>
            <h3>{t('profile.myInformation')}</h3>
            <p>{t('profile.email')}: {user.result.user_email}</p>
            <p>{t('profile.city')}: {user.result.user_city || t('profile.noData')}</p>
            <p>{t('profile.phone')}: {user.result.user_phone || t('profile.noData')}</p>
          </div>
          {error && (
            <div className={styles.alert}>
              {error}
            </div>
          )}
          <div className={styles.divider}></div>
          <UserCompaniesList userId={user?.result.user_id}/>
        </div>
      </div>
      <UniversalModal
        open={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
        title={t('profile.updateProfile')}
        content={
          <UserUpdateForm
            userId={user.result.user_id}
            userFirstname={user.result.user_firstname || ""}
            userLastname={user.result.user_lastname || ""}
            userCity={user.result.user_city || ""}
            userPhone={user.result.user_phone || ""}
            onClose={handleUpdateSuccess}
            onError={setError}
          />
        }
      />
      <UniversalModal
        open={showDeleteForm}
        onClose={() => setShowDeleteForm(false)}
        title={t('profile.deleteProfile')}
        content={
          <UserDeleteForm
            userId={user.result.user_id}
            onClose={() => setShowDeleteForm(false)}
            onError={setError}
          />
        }
        actions={
          <Button onClick={() => setShowDeleteForm(false)} variant="contained">
            {t('profile.cancel')}
          </Button>
        }
      />
      <UniversalModal
        open={showAvatarForm}
        onClose={() => setShowAvatarForm(false)}
        title={t('profile.uploadAvatar')}
        content={
          <UpdateAvatar
            userId={user.result.user_id}
            onClose={() => setShowAvatarForm(false)}
          />
        }
      />
      <UniversalModal
        open={showCreateCompanyForm}
        onClose={() => setShowCreateCompanyForm(false)}
        title={t('profile.createCompany')}
        content={
          <CreateCompanyForm
            onClose={() => setShowCreateCompanyForm(false)}
            onCreateSuccess={handleCreateCompanySuccess}
          />
        }
        actions={
          <Button onClick={() => setShowCreateCompanyForm(false)} variant="contained">
            {t('universalModal.close')}
          </Button>
        }
      />
      <UniversalModal
        open={showInviteForm}
        onClose={() => setShowInviteForm(false)}
        title={t('profile.inviteToCompany')}
        content={
          <InviteFromUserToCompany
            onClose={() => setShowInviteForm(false)}
            onActionSuccess={handleInviteSuccess}
          />
        }
      />
      <InvitesToCompanyList userId={user.result.user_id}/>
      <RequestsFromUserList userId={user.result.user_id}/>
    </div>
  );
};

export {UserProfile};
