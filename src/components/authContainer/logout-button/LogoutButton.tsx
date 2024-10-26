import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../../hooks";
import {authActions} from "../../../store/slices/authSlice";
import {Routes} from "../../../utils";

const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.clearToken());
        navigate(Routes.LOGIN);
    };

    return (
        <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
                marginLeft: 2,
                borderRadius: 2,
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
            }}
        >
            Logout
        </Button>
    );
};

export {LogoutButton};
