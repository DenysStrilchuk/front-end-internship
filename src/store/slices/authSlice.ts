import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITokenResult} from "../../types/api-types/authTypes";
import {TOKEN_LIFETIME} from "../../constants/auth";

interface AuthState {
    token: string | null;
    tokenType: string | null;
    isAuthenticated: boolean;
    expirationDate: number | null;
}

const initialState: AuthState = {
    token: null,
    tokenType: null,
    isAuthenticated: false,
    expirationDate: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (
            state,
            action: PayloadAction<ITokenResult>
        ) => {
            state.token = action.payload.access_token;
            state.tokenType = action.payload.token_type;
            state.isAuthenticated = true;
            state.expirationDate = Date.now() + TOKEN_LIFETIME;
        },
        clearToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.expirationDate = null;
        },
    },
});

const selectIsAuthenticated = (state: { auth: AuthState }) =>
    state.auth.isAuthenticated;
const selectTokenExpiration = (state: { auth: AuthState }) =>
    state.auth.expirationDate;

const {reducer: authReducer, actions: authActions} = authSlice;

export {
    authReducer,
    authActions,
    selectIsAuthenticated,
    selectTokenExpiration
};
