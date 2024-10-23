import React from "react";
import {Modal, Box, Typography, Button} from "@mui/material";

interface UniversalModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

const UniversalModal: React.FC<UniversalModalProps> = ({open, onClose, title, content, actions}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                {title && (
                    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                        {title}
                    </Typography>
                )}
                {content && (
                    <Typography id="modal-description" variant="body1" gutterBottom>
                        {content}
                    </Typography>
                )}
                <Box mt={2}>
                    {actions || (
                        <Button variant="contained" color="primary" onClick={onClose}>
                            Close
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export {UniversalModal}
