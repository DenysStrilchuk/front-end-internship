import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { ICreateUser, IPagination, IUpdateUser, IUser, IUserListResponse } from "../../models/IUser";
import { userApi } from "../../api/user-api";
import { IApiError } from "../../types/api-types/errorTypes";

interface UserState {
    users: IUser[];
    userDetail: IUser | null;
    loading: boolean;
    error: string | null;
    pagination: IPagination | null;
}

const initialState: UserState = {
    users: [],
    userDetail: null,
    loading: false,
    error: null,
    pagination: null,
};

const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async ({ page, pageSize }: { page: number; pageSize: number }, { rejectWithValue }) => {
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
    async (userId: number, { rejectWithValue }) => {
        try {
            return await userApi.getUserById(userId);
        } catch (error: unknown) {
            const apiError = error as IApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch user');
        }
    }
);

const createUser = createAsyncThunk(
    'users/createUser',
    async (userData: ICreateUser, { rejectWithValue }) => {
        try {
            return await userApi.createUser(userData);
        } catch (error: unknown) {
            const apiError = error as IApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Failed to create user');
        }
    }
);

const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, data }: { userId: number; data: IUpdateUser }, { rejectWithValue }) => {
        try {
            return await userApi.updateUser(userId, data);
        } catch (error: unknown) {
            const apiError = error as IApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Failed to update user');
        }
    }
);

const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId: number, { rejectWithValue }) => {
        try {
            await userApi.deleteUser(userId);
            return userId;
        } catch (error: unknown) {
            const apiError = error as IApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Failed to delete user');
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
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
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.userDetail = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
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
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

const { reducer: userReducer, actions: userActions } = userSlice;

export {
    userReducer,
    userActions,
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
};