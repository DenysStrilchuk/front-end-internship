import { configureStore } from '@reduxjs/toolkit';

import {testReducer} from "./slices";

const store = configureStore({
    reducer: {
        test: testReducer,
    },
});

export {store};
