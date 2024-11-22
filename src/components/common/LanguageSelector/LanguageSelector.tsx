import React from 'react';
import {useTranslation} from 'react-i18next';
import {FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';

const LanguageSelector: React.FC = () => {
  const {i18n, t} = useTranslation();

  const changeLanguage = async (e: SelectChangeEvent) => {
    const language = e.target.value;
    try {
      await i18n.changeLanguage(language);
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <FormControl variant="outlined" size="small" sx={{marginLeft: 2}}>
      <InputLabel
        sx={{
          color: 'white',
          '&.Mui-focused': {color: 'white'},
          '&.MuiInputLabel-shrink': {color: 'white'},
        }}
      >
        {t('language')}
      </InputLabel>
      <Select
        value={i18n.language}
        onChange={changeLanguage}
        label={t('language')}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <MenuItem value="en" sx={{color: 'black'}}>{t('english')}</MenuItem>
        <MenuItem value="ua" sx={{color: 'black'}}>{t('ukrainian')}</MenuItem>
      </Select>
    </FormControl>
  );
};

export {LanguageSelector};
