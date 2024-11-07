import {configureStore} from '@reduxjs/toolkit';

import {authReducer, userReducer} from "./slices";
import {companyReducer} from "./slices/companySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        companies: companyReducer,
    },
});

export {store};
