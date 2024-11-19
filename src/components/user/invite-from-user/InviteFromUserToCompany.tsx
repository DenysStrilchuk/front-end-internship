import React, {useEffect, useState} from 'react';
import {Avatar, Button} from '@mui/material';
import {useTranslation} from "react-i18next";
import {toast} from 'react-toastify';

import {inviteFromUser} from "../../../store/slices";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import styles from './InviteFromUserToCompany.module.css';
import {fetchAllCompanies} from "../../../store/slices/companySlice";
import {ICompany} from "../../../models/ICompany";
import {Pagination} from "../../common/Pagination";
import {Loader} from "../../common/LoaderContainer";

interface InviteFromUserToCompanyProps {
  onClose: () => void;
  onActionSuccess: () => void;
}

const InviteFromUserToCompany: React.FC<InviteFromUserToCompanyProps> = ({onClose, onActionSuccess}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<number>>(new Set());
  const {allCompanies, loading, error, pagination} = useAppSelector((state) => state.companies);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchAllCompanies({page: currentPage, pageSize}));
    setSelectedCompanies(new Set());
  }, [dispatch, currentPage, pageSize]);

  const handleSelectCompany = (companyId: number) => {
    setSelectedCompanies((prevSelected) => {
      const updated = new Set(prevSelected);
      updated.has(companyId) ? updated.delete(companyId) : updated.add(companyId);
      return updated;
    });
  };

  const handleCreateAction = async () => {
    try {
      await Promise.all(
        Array.from(selectedCompanies).map(companyId =>
          dispatch(inviteFromUser(companyId)).unwrap()
        )
      );
      toast.success(t('inviteFromUserToCompany.success'));
      setSelectedCompanies(new Set());
      onActionSuccess();
      onClose();
    } catch (err) {
      const message = t(`inviteFromUserToCompany.${err}`) || t('inviteFromUserToCompany.errors.unknown');
      toast.error(message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {loading && <Loader/>}
      {!loading && error && <p>{t('inviteFromUserToCompany.error.fetchUsers')}</p>}
      {!loading && !error && (
        <>
          <div className={styles.companyList}>
            {allCompanies.map((company: ICompany) => (
              <div key={company.company_id} className={styles.companyItem}>
                <Avatar
                  src={company.company_avatar}
                  alt={`${company.company_name}`}
                  className={styles.avatar}
                />
                <span className={styles.companyName}>{`${company.company_name}`}</span>
                <div className={styles.selectButtonContainer}>
                  <Button
                    onClick={() => handleSelectCompany(company.company_id)}
                    className={styles.selectButton}
                    variant={selectedCompanies.has(company.company_id) ? "contained" : "outlined"}
                  >
                    {selectedCompanies.has(company.company_id)
                      ? t('inviteFromUserToCompany.selected')
                      : t('inviteFromUserToCompany.select')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {selectedCompanies.size > 0 && (
            <div className={styles.addSelectedButtonContainer}>
              <Button
                onClick={handleCreateAction}
                className={styles.addSelectedButton}
                variant="contained"
                color="primary"
              >
                {t('inviteFromUserToCompany.addSelectedCompanies')}
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

export {InviteFromUserToCompany};
