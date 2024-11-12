import React, {useState} from 'react';
import {TextField, Button} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {ValidationError, ValidationErrorItem} from "joi";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {updateCompany} from "../../../store/slices/companySlice";
import {ICompany} from "../../../models/ICompany";
import {companyUpdateValidationSchema} from "../../../validators/companyUpdateForm-validator";
import styles from './CompanyUpdateForm.module.css';

interface CompanyUpdateFormProps {
    companyId: number;
    companyName: string;
    companyDescription: string;
    companyCity: string;
    companyPhone: string;
    companyLinks: string[];
    onClose: () => void;
    onError?: (message: string) => void;
}

const UpdateCompanyComponent: React.FC<CompanyUpdateFormProps> = ({
      companyId,
      companyName,
      companyDescription,
      companyCity,
      companyPhone,
      companyLinks,
      onClose,
      onError
    }) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {loading, error} = useAppSelector((state) => state.companies);

    const [formData, setFormData] = useState<Partial<ICompany>>({
        company_name: companyName || '',
        company_description: companyDescription || '',
        company_city: companyCity || '',
        company_phone: companyPhone || '',
        company_links: companyLinks || [],
    });

    const [newLink, setNewLink] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (field: keyof ICompany, value: string | []) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLink(e.target.value);
    };

    const handleAddLink = () => {
        if (newLink && !formData.company_links?.includes(newLink)) {
            setFormData((prevData) => ({
                ...prevData,
                company_links: [...(prevData.company_links || []), newLink]
            }));
            setNewLink('');
        }
    };

    const handleRemoveLink = (link: string) => {
        setFormData((prevData) => ({
            ...prevData,
            company_links: (prevData.company_links || []).filter(l => l !== link)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await companyUpdateValidationSchema.validateAsync(formData, {abortEarly: false});
            await dispatch(updateCompany({companyId, updateData: formData}));
            onClose();
        } catch (validationError: unknown) {
            const errors: { [key: string]: string } = {};
            if (validationError instanceof ValidationError) {
                validationError.details.forEach((detail: ValidationErrorItem) => {
                    errors[detail.path[0]] = t(detail.message);
                });
                setValidationErrors(errors);
                if (onError) {
                    onError(t('validationError'));
                }
            } else {
                setValidationErrors({
                    general: t('unknownError')
                });
            }
        }
    };

    return (
        <div className={styles.companyUpdateForm}>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label={t('company.name')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.company_name}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        error={!!validationErrors.company_name}
                        helperText={validationErrors.company_name}
                    />
                </div>
                <div>
                    <TextField
                        label={t('company.description')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.company_description}
                        onChange={(e) => handleInputChange('company_description', e.target.value)}
                        error={!!validationErrors.company_description}
                        helperText={validationErrors.company_description}
                    />
                </div>
                <div>
                    <TextField
                        label={t('company.city')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.company_city}
                        onChange={(e) => handleInputChange('company_city', e.target.value)}
                        error={!!validationErrors.company_city}
                        helperText={validationErrors.company_city}
                    />
                </div>
                <div>
                    <TextField
                        label={t('company.phone')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.company_phone}
                        onChange={(e) => handleInputChange('company_phone', e.target.value)}
                        error={!!validationErrors.company_phone}
                        helperText={validationErrors.company_phone}
                    />
                </div>
                <div>
                    <TextField
                        label={t('company.links')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newLink}
                        onChange={handleLinkChange}
                        error={!!validationErrors.company_links}
                        helperText={validationErrors.company_links}
                    />
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{
                            borderColor: 'green',
                            color: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                                borderColor: 'darkgreen',
                                color: 'white'
                            }
                        }}
                        onClick={handleAddLink}
                        disabled={!newLink}
                    >
                        {t('company.buttonAddLink')}
                    </Button>
                    {Array.isArray(formData.company_links) && formData.company_links.length > 0 && (
                        <div>
                            <h4>{t('company.existingLinks')}</h4>
                            <ul>
                                {formData.company_links.map((link, index) => (
                                    <li key={index}>
                                        {link}
                                        <Button
                                            onClick={() => handleRemoveLink(link)}
                                            variant="text"
                                            color="error"
                                        >
                                            {t('company.remove')}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                >
                    {t('company.buttonUpdate')}
                </Button>
            </form>
            {loading && <p>{t('loading')}...</p>}
            {error && <p className={styles.errorText}>{t('error')}: {error}</p>}
        </div>
    );
};

export {UpdateCompanyComponent};
