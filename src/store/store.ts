import {configureStore} from '@reduxjs/toolkit';

import {testReducer, authReducer} from "./slices";

const store = configureStore({
    reducer: {
        test: testReducer,
        auth: authReducer,
    },
});

export {store};
