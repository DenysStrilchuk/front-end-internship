import { configureStore } from '@reduxjs/toolkit';

import {testReducer} from "./slices";
import {authReducer} from "./slices/authSlice";

const store = configureStore({
    reducer: {
        test: testReducer,
        auth: authReducer,
    },
});

export {store};
