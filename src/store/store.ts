import {configureStore} from '@reduxjs/toolkit';

import {authReducer, userReducer} from "./slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});

export {store};
