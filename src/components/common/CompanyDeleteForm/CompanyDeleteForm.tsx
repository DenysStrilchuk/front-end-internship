import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {deleteCompany} from "../../../store/slices/companySlice";
import {Routes} from "../../../utils/routes";

interface CompanyDeleteFormProps {
  companyId: number;
  onError: (message: string) => void;
  onClose: () => void;
}

const CompanyDeleteForm: React.FC<CompanyDeleteFormProps> = ({companyId, onError, onClose}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [confirm, setConfirm] = useState<boolean>(false);
  const errorMessage = useAppSelector((state) => state.companies.error);

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirm(true);
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(deleteCompany(companyId));

    if (!errorMessage) {
      navigate(Routes.PROFILE);
    } else {
      onError(errorMessage || t('deleteCompany.error.deleteFailed'));
    }
  };

  return (
    <div>
      <p>{t('deleteCompany.confirmationMessage')}</p>
      {!confirm ? (
        <form onSubmit={handleConfirmSubmit}>
          <Button type="submit" variant="contained" color="primary">
            {t('deleteCompany.confirmDelete')}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleDeleteSubmit}>
          <Button type="submit" variant="contained" color="error">
            {t('deleteCompany.yesDelete')}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
            {t('deleteCompany.cancel')}
          </Button>
        </form>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export {CompanyDeleteForm}
