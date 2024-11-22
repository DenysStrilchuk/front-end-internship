import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationUA from '../locales/ua/translation.json';

const savedLanguage = localStorage.getItem('language') || 'en';

const initI18n = async (): Promise<void> => {
  try {
    await i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: {translation: translationEN},
          ua: {translation: translationUA},
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });
  } catch (error) {
    console.error('Error initializing i18n:', error);
  }
};

initI18n();

export {i18n};
