import React from "react";
import {Modal, Box, Typography, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import styles from "./UniversalModal.module.css";

interface UniversalModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
}

const UniversalModal: React.FC<UniversalModalProps> = ({open, onClose, title, content, actions}) => {
    const {t} = useTranslation();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={styles.modalBox} sx={{bgcolor: 'background.paper'}}>
                {title && (
                    <Typography id="modal-title" variant="h6" component="h2" className={styles.modalTitle}>
                        {t(title)}
                    </Typography>
                )}
                {content && (
                    <Typography id="modal-description" variant="body1" className={styles.modalContent}>
                        {content}
                    </Typography>
                )}
                <Box className={styles.modalActions}>
                    {actions || (
                        <Button variant="contained" color="primary" onClick={onClose}>
                            {t('universalModal.close')}
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export {UniversalModal};
