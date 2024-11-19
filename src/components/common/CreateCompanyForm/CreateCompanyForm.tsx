import React, {useState} from "react";
import {TextField, Checkbox, FormControlLabel, Button} from "@mui/material";
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {createCompany} from "../../../store/slices/companySlice";
import styles from "./CreateCompanyForm.module.css";
import {schema} from "../../../validators/companyCreateForm-validator/companyCreateForm.validator";

interface CreateCompanyFormProps {
  onClose: () => void;
  onCreateSuccess: () => void;
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({onClose, onCreateSuccess}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector((state) => state.companies);

  const [companyName, setCompanyName] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [validationErrors, setValidationErrors] = useState<{ company_name?: string }>({});

  const handleValidation = () => {
    const {error} = schema.validate({company_name: companyName, is_visible: isVisible});
    if (error) {
      const errors: { company_name?: string } = {};
      error.details.forEach(detail => {
        if (detail.path[0] === 'company_name') {
          errors.company_name = t(detail.message);
        }
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    await dispatch(createCompany({
      company_name: companyName,
      is_visible: isVisible,
    }));

    if (!error) {
      setCompanyName('');
      setIsVisible(true);
      onCreateSuccess();
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label={t('createCompany.companyName')}
            variant="outlined"
            fullWidth
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            error={!!validationErrors.company_name}
            helperText={validationErrors.company_name}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                color="primary"
              />
            }
            label={t('createCompany.visibility')}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {t('createCompany.createButton')}
        </Button>
      </form>
      {error && (
        <p className={styles.errorText}>
          {t('createCompany.error')}: {error}
        </p>
      )}
    </div>
  );
};

export {CreateCompanyForm};
