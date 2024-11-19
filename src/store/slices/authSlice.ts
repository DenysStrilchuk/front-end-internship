import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {ITokenResult} from "../../types/api-types/authTypes";
import {IGetMeResponse} from "../../models/IUser";
import {tokenService} from "../../api/token-service";
import {TOKEN_LIFETIME} from "../../constants/auth";
import {authApi} from "../../api/auth-api";

interface AuthState {
  token: string | null;
  tokenType: string | null;
  isAuthenticated: boolean;
  expirationDate: number | null;
  user: IGetMeResponse | null;
  loading: boolean;
  error: string | null;
}

const parsedToken = tokenService.getToken();

const initialState: AuthState = {
  token: parsedToken ? parsedToken.access_token : null,
  tokenType: parsedToken ? parsedToken.token_type : null,
  isAuthenticated: !!parsedToken,
  expirationDate: parsedToken ? Date.now() + TOKEN_LIFETIME : null,
  user: null,
  loading: false,
  error: null,
};

const getMe = createAsyncThunk<IGetMeResponse, void, { rejectValue: string }>(
  "auth/getMe",
  async (_, {rejectWithValue}) => {
    try {
      return await authApi.getMe();
    } catch {
      return rejectWithValue("profile.errorFetching");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ITokenResult>) => {
      state.token = action.payload.access_token;
      state.tokenType = action.payload.token_type;
      state.isAuthenticated = true;
      state.expirationDate = Date.now() + TOKEN_LIFETIME;
    },
    clearToken: (state) => {
      state.token = null;
      state.tokenType = null;
      state.isAuthenticated = false;
      state.expirationDate = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<IGetMeResponse>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? "auth.getMeError" : "auth.unknownError";
      });
  },
});

const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
const selectTokenExpiration = (state: { auth: AuthState }) => state.auth.expirationDate;

const {reducer: authReducer, actions: authActions} = authSlice;

export {
  authReducer,
  authActions,
  selectIsAuthenticated,
  selectTokenExpiration,
  getMe,
};
