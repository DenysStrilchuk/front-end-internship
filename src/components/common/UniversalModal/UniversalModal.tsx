import React from "react";
import {Modal, Button} from "@mui/material";
import {useTranslation} from "react-i18next";

import styles from "./UniversalModal.module.css";

interface UniversalModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}

const UniversalModal: React.FC<UniversalModalProps> = ({open, onClose, title, content, actions, children}) => {
    const {t} = useTranslation();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className={styles.modalContainer}>
                {title && (
                    <h2 id="modal-title" className={styles.modalTitle}>
                        {t(title)}
                    </h2>
                )}
                <div>
                    {children}
                </div>
                {content && (
                    <div id="modal-description" className={styles.modalContent}>
                        {content}
                    </div>
                )}
                <div className={styles.modalActions}>
                    {actions || (
                        <Button variant="contained" color="primary" onClick={onClose}>
                            {t('universalModal.close')}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export {UniversalModal};
