import React from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSelector: React.FC = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value;
        try {
            await i18n.changeLanguage(language);
            localStorage.setItem('language', language);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <div>
            <label>{t('language')}</label>
            <select value={i18n.language} onChange={changeLanguage}>
                <option value="en">{t('english')}</option>
                <option value="ua">{t('ukrainian')}</option>
            </select>
        </div>
    );
};

export {LanguageSelector};
