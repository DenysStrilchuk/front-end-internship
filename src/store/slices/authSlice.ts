import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITokenResult} from "../../types/api-types/authTypes";
import {TOKEN_LIFETIME} from "../../constants/auth";

interface AuthState {
    token: string | null;
    tokenType: string | null;
    isAuthenticated: boolean;
    expirationDate: number | null;
}

const savedToken = localStorage.getItem('token');
const parsedToken = savedToken ? JSON.parse(savedToken) : null;

const initialState: AuthState = {
    token: parsedToken ? parsedToken.access_token : null,
    tokenType: parsedToken ? parsedToken.token_type : null,
    isAuthenticated: !!parsedToken,
    expirationDate: parsedToken ? Date.now() + TOKEN_LIFETIME : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<ITokenResult>) => {
            state.token = action.payload.access_token;
            state.tokenType = action.payload.token_type;
            state.isAuthenticated = true;
            state.expirationDate = Date.now() + TOKEN_LIFETIME;

            // Save token to localStorage
            localStorage.setItem('token', JSON.stringify(action.payload));
        },
        clearToken: (state) => {
            state.token = null;
            state.tokenType = null;
            state.isAuthenticated = false;
            state.expirationDate = null;

            // Remove token from localStorage
            localStorage.removeItem('token');
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
