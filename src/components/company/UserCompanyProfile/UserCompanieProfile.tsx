import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Button} from '@mui/material';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {fetchCompanyById} from '../../../store/slices/companySlice';
import {Loader} from '../../common/LoaderContainer';
import {UpdateCompanyComponent} from "../../common/CompanyUpdateForm";
import {UniversalModal} from "../../common/UniversalModal";
import {CompanyVisibilityToggle} from "../../common/CompanyVisibilityToggle";
import styles from './UserCompanieProfile.module.css';
import {UpdateCompanyAvatar} from "../../common/UpdateCompanyAvatar";
import {CompanyDeleteForm} from "../../common/CompanyDeleteForm";

const UserCompanyProfile = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {companyDetail, loading, error} = useAppSelector((state) => state.companies);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showAvatarUpdateForm, setShowAvatarUpdateForm] = useState<boolean>(false);
    const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);


    useEffect(() => {
        if (id) {
            dispatch(fetchCompanyById(Number(id)));
        }
    }, [dispatch, id]);

    const handleClose = () => {
        setShowUpdateForm(false);
        setShowAvatarUpdateForm(false);
        if (companyDetail) {
            dispatch(fetchCompanyById(companyDetail.company_id));
        }
    };

    const handleVisibilityToggle = () => {
        if (companyDetail) {
            dispatch(fetchCompanyById(companyDetail.company_id));
        }
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <div>
                    <Loader/>
                </div>
            ) : (
                <span>
                    {error && <div className={styles.alert}>{t('company.error')}</div>}
                    {companyDetail ? (
                        <div className={styles.profileContainer}>
                            <div className={styles.profileSideBar}>
                                <Avatar
                                    src={companyDetail.company_avatar ? `${companyDetail.company_avatar}?timestamp=${Date.now()}` : ''}
                                    alt={companyDetail.company_name || t('company.companyLogo')}
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
                                        {t('company.buttonUpdate')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setShowAvatarUpdateForm(true)}
                                    >
                                        {t('company.buttonUpdateAvatar')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => setShowDeleteForm(true)}
                                    >
                                        {t('company.buttonDelete')}
                                    </Button>
                                    <CompanyVisibilityToggle
                                        companyId={companyDetail.company_id}
                                        isVisible={companyDetail.is_visible ?? false}
                                        onToggle={handleVisibilityToggle}
                                    />
                                </div>
                            </div>
                            <div className={styles.mainContent}>
                                <h2>{companyDetail.company_name}</h2>
                                {!companyDetail.is_visible && (
                                    <span className={styles.hiddenText}> {t('userCompanies.hidden')}</span>
                                )}
                                <div className={styles.divider}></div>
                                <p className={styles.description}>
                                    {companyDetail.company_description || t('company.noDescriptionAvailable')}
                                </p>
                                <div className={styles.divider}></div>
                                <h3>{t('company.information')}</h3>
                                <p><strong>{t('company.city')}: </strong>
                                    {companyDetail.company_city || t('company.unknown')}
                                </p>
                                <p><strong>{t('company.phone')}: </strong>
                                    {companyDetail.company_phone || t('company.notProvided')}
                                </p>
                                <div>
                                    <strong>{t('company.links')}: </strong>
                                    {companyDetail.company_links && companyDetail.company_links.length > 0 ? (
                                        <ul>
                                            {companyDetail.company_links.map((link, index) => (
                                                <li key={index}>
                                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                                        {link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>{t('company.noLinksAvailable')}</span>
                                    )}
                                </div>
                            </div>
                            {showUpdateForm && (
                                <UniversalModal
                                    open={showUpdateForm}
                                    onClose={handleClose}
                                    title={t('company.updateCompanyProfile')}
                                    content={
                                        <UpdateCompanyComponent
                                            companyId={companyDetail.company_id}
                                            companyName={companyDetail.company_name || ''}
                                            companyDescription={companyDetail.company_description || ''}
                                            companyCity={companyDetail.company_city || ''}
                                            companyPhone={companyDetail.company_phone || ''}
                                            companyLinks={companyDetail.company_links || []}
                                            onClose={handleClose}
                                        />
                                    }
                                />
                            )}
                            {showAvatarUpdateForm && (
                                <UniversalModal
                                    open={showAvatarUpdateForm}
                                    onClose={handleClose}
                                    title={t('company.updateCompanyAvatar')}
                                    content={
                                        <UpdateCompanyAvatar
                                            companyId={companyDetail.company_id}
                                            onClose={handleClose}
                                        />}
                                />
                            )}
                            {showDeleteForm && (
                                <UniversalModal
                                    open={showDeleteForm}
                                    onClose={() => setShowDeleteForm(false)}
                                    title={t('company.deleteCompanyTitle')}
                                    content={
                                        <CompanyDeleteForm
                                            companyId={companyDetail.company_id}
                                            onError={(message) => setDeleteError(message)}
                                            onClose={() => setShowDeleteForm(false)}
                                        />
                                    }
                                />
                            )}
                            {deleteError && <div className={styles.alert}>{deleteError}</div>}
                        </div>
                    ) : (
                        <div>{t('company.noCompanyDetails')}</div>
                    )}
                </span>
            )}
        </div>
    );
};

export {UserCompanyProfile};
