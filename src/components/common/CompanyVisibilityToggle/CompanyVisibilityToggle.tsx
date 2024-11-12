import React, {useState, useEffect} from 'react';
import {Switch, FormControlLabel, Tooltip, CircularProgress} from '@mui/material';
import {useTranslation} from 'react-i18next';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {updateCompanyVisibility} from '../../../store/slices/companySlice';
import styles from './CompanyVisibilityToggle.module.css';

interface CompanyVisibilityToggleProps {
    companyId: number;
    isVisible: boolean;
    onToggle: () => void;
}

const CompanyVisibilityToggle: React.FC<CompanyVisibilityToggleProps> = ({companyId, isVisible, onToggle}) => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector((state) => state.companies);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentVisibility, setCurrentVisibility] = useState<boolean>(isVisible);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        if (error) {
            setErrorMessage(t('companyVisibilityToggle.errors.failedToUpdateVisibility'));
        } else {
            setErrorMessage(t('companyVisibilityToggle.errors.errorOccurred'));
        }
    }, [error, t]);

    const handleToggleVisibility = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVisibility = event.target.checked;
        setCurrentVisibility(newVisibility);
        setLoading(true);
        try {
            await dispatch(updateCompanyVisibility({companyId, isVisible: newVisibility})).unwrap();
            onToggle();
        } catch {
            setCurrentVisibility(isVisible);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Tooltip
                title={currentVisibility ? t('companyVisibilityToggle.companyHidden') : t('companyVisibilityToggle.companyVisible')}>
                <FormControlLabel
                    control={
                        <div className={styles.switchContainer}>
                            <Switch
                                checked={currentVisibility}
                                onChange={handleToggleVisibility}
                                color="primary"
                                disabled={loading}
                            />
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    color="inherit"
                                    className={styles.circularProgress}
                                />
                            )}
                        </div>
                    }
                    label={t('companyVisibilityToggle.visible')}
                />
            </Tooltip>
            {errorMessage && (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export {CompanyVisibilityToggle};
