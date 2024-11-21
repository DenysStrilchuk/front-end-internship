import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

import {IAcceptInviteResponse, IPagination, IUpdateUser, IUser, IUserListResponse} from "../../models/IUser";
import {userApi} from "../../api/user-api";
import {IApiError} from "../../types/api-types/errorTypes";
import {IInviteCompany} from "../../models/ICompany";

interface UserState {
  users: IUser[];
  userDetail: IUser | null;
  loading: boolean;
  error: string | null;
  errorMessage: string | null,
  pagination: IPagination | null;
  avatar: string | null;
  invites: IInviteCompany[];
  createdActionId: number | null;
}

const initialState: UserState = {
  users: [],
  userDetail: null,
  loading: false,
  error: null,
  errorMessage: null,
  pagination: null,
  avatar: null,
  invites: [],
  createdActionId: null,
};

const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async ({page, pageSize}: { page: number; pageSize: number }, {rejectWithValue}) => {
    try {
      return await userApi.getAllUsers(page, pageSize);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number, {rejectWithValue}) => {
    try {
      return await userApi.getUserById(userId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch user');
    }
  }
);

const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({userId, data}: { userId: number; data: IUpdateUser }, {rejectWithValue}) => {
    try {
      return await userApi.updateUser(userId, data);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'updateUser.errorUpdating');
    }
  }
);

const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number, {rejectWithValue}) => {
    try {
      await userApi.deleteUser(userId);
      return userId;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to delete user');
    }
  }
);

const fetchInvitesListToCompany = createAsyncThunk<IInviteCompany[], number, { rejectValue: string }>(
  'users/fetchInvitesList',
  async (userId: number, {rejectWithValue}) => {
    try {
      const response = await userApi.getInvitesList(userId);
      return response.result.companies;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'errors.fetchInvitesFailed');
    }
  }
);

const inviteFromUser = createAsyncThunk<IInviteCompany[], number, { rejectValue: string }>(
  'users/createActionFromUser',
  async (companyId, {rejectWithValue}) => {
    try {
      const response = await userApi.inviteFromUserToCompany(companyId);
      return response.result.action_id;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'errors.failedToCreateActionFromUser');
    }
  }
);

const acceptInvite = createAsyncThunk<
  IAcceptInviteResponse,
  number,
  { rejectValue: string }
>(
  "users/acceptInvite",
  async (actionId, { rejectWithValue }) => {
    try {
      return await userApi.acceptInvite(actionId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || "errors.failedToAcceptInvite");
    }
  }
);

const cancelInvite = createAsyncThunk<number, number>(
  'companies/cancelInvite',
  async (actionId, { rejectWithValue }) => {
    try {
      await userApi.declineInvite(actionId);
      return actionId;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'errors.failedToCancelInvite');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUserListResponse>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        const index = state.users.findIndex((user) => user.user_id === action.payload.user_id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.user_id !== action.payload);
        state.errorMessage = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchInvitesListToCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvitesListToCompany.fulfilled, (state, action: PayloadAction<IInviteCompany[]>) => {
        state.loading = false;
        state.invites = action.payload;
      })
      .addCase(fetchInvitesListToCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(inviteFromUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteFromUser.fulfilled, (state, action: PayloadAction<IInviteCompany[]>) => {
        state.loading = false;
        state.createdActionId = action.payload[0]?.action_id ?? null;
      })
      .addCase(inviteFromUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvite.fulfilled, (state, action: PayloadAction<IAcceptInviteResponse>) => {
        state.loading = false;
        state.createdActionId = action.payload.result.action_id;

        state.invites = state.invites.filter(
          (invite) => invite.action_id !== action.payload.result.action_id
        );
      })
      .addCase(acceptInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelInvite.fulfilled, (state, action: PayloadAction<number>) => {
        state.invites = state.invites.filter((invite) => invite.action_id !== action.payload);
        state.error = null;
      })
      .addCase(cancelInvite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

const {reducer: userReducer, actions: userActions} = userSlice;

export {
  userReducer,
  userActions,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  fetchInvitesListToCompany,
  inviteFromUser,
  acceptInvite,
  cancelInvite,
};
