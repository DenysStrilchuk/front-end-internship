import {configureStore} from '@reduxjs/toolkit';

import {testReducer, authReducer, userReducer} from "./slices";

const store = configureStore({
    reducer: {
        test: testReducer,
        auth: authReducer,
        users: userReducer,
    },
});

export {store};
