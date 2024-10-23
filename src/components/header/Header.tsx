import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Routes} from "../../utils/routes";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    My App
                </Typography>
                <Button color="inherit" component={RouterLink} to={Routes.HOME}>
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.ABOUT}>
                    About
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.USERS}>
                    Users
                </Button>
                <Button color="inherit" component={RouterLink} to={Routes.COMPANIES}>
                    Companies
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export {Header};
