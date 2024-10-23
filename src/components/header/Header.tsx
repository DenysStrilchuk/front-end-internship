import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    My App
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/about">
                    About
                </Button>
                <Button color="inherit" component={RouterLink} to="/users">
                    Users
                </Button>
                <Button color="inherit" component={RouterLink} to="/companies">
                    Companies
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export {Header};
