import React, {useState} from 'react';

import {userApi} from "../../../api/user-api";
import {useAppDispatch} from "../../../hooks";
import {useNavigate} from "react-router-dom";
import {handleLogout} from "../../../utils/logout-helper";

interface UserDeleteFormProps {
    userId: number;
    onError: (message: string) => void;
    onClose: () => void;
}

const UserDeleteForm: React.FC<UserDeleteFormProps> = ({userId, onError, onClose}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await userApi.deleteUser(userId);
            handleLogout(dispatch, navigate);
        } catch (error) {
            if (error instanceof Error) {
                onError(error.message);
            } else {
                onError("An unknown error occurred.");
            }
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
            {!confirm ? (
                <button onClick={() => setConfirm(true)}>Confirm Delete</button>
            ) : (
                <>
                    <button onClick={handleDelete}>Yes, Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </>
            )}
        </div>
    );
};

export {UserDeleteForm};
