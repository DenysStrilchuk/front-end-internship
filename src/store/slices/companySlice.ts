import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IPagination, IUserListResponse} from "../../models/IUser";
import {IApiError} from "../../types/api-types/errorTypes";
import {companyApi} from "../../api/company-api";
import {
  IAcceptRequestResponse,
  ICompaniesListResponse,
  ICompany,
  IGetMembersListResponse
} from "../../models/ICompany";

interface CompanyState {
  companies: ICompany[];
  allCompanies: ICompany[];
  companyDetail: ICompany | null;
  loading: boolean;
  error: string | null;
  invitesError: string | null;
  invitedError: string | null;
  errorMessage: string | null;
  pagination: IPagination | null;
  avatar: string | null;
  invitedUsers: IUserListResponse | null;
  requestsList: IUserListResponse | null;
  membersList: IGetMembersListResponse | null;
}

const initialState: CompanyState = {
  companies: [],
  allCompanies: [],
  companyDetail: null,
  loading: false,
  error: null,
  invitesError: null,
  invitedError: null,
  errorMessage: null,
  pagination: null,
  avatar: null,
  invitedUsers: null,
  requestsList: null,
  membersList: null,
};

const fetchAllCompanies = createAsyncThunk(
  'companies/fetchAllCompanies',
  async ({page, pageSize}: { page: number; pageSize: number }, {rejectWithValue}) => {
    try {
      return await companyApi.getAllCompanies(page, pageSize);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch companies');
    }
  }
);

const fetchCompanyById = createAsyncThunk(
  'companies/fetchCompanyById',
  async (companyId: number, {rejectWithValue}) => {
    try {
      return await companyApi.getCompanyById(companyId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'failedToFetch');
    }
  }
);

const fetchUserCompanies = createAsyncThunk(
  'companies/fetchUserCompanies',
  async (userId: number, {rejectWithValue}) => {
    try {
      return  await companyApi.getCompaniesByUserId(userId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      console.error('Error fetching user companies:', apiError.response?.data);
      return rejectWithValue(apiError.response?.data?.message || 'failedToFetch');
    }
  }
);

const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (newCompany: { company_name: string; is_visible: boolean; }, {rejectWithValue}) => {
    try {
      return await companyApi.createCompany(newCompany);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      const errorKey = apiError.response?.data?.message || 'failedToFetch';
      return rejectWithValue(errorKey);
    }
  }
);

const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async ({companyId, updateData}: { companyId: number; updateData: Partial<ICompany> }, {rejectWithValue}) => {
    try {
      return await companyApi.updateCompany(companyId, updateData);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to update company');
    }
  }
);

const updateCompanyVisibility = createAsyncThunk(
  'company/updateVisibility',
  async ({companyId, isVisible}: { companyId: number, isVisible: boolean }, {rejectWithValue}) => {
    try {
      return await companyApi.updateCompanyVisibility(companyId, isVisible);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      const errorMessage = apiError.response?.data?.message || 'failedToUpdateVisibility';
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCompanyAvatar = createAsyncThunk(
  'companies/updateCompanyAvatar',
  async ({companyId, file}: { companyId: number; file: File }, {rejectWithValue}) => {
    try {
      return await companyApi.updateCompanyAvatar(companyId, file);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to update company avatar');
    }
  }
);

const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (companyId: number, {rejectWithValue}) => {
    try {
      await companyApi.deleteCompany(companyId);
      return companyId;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to delete company');
    }
  }
);

const inviteUser = createAsyncThunk(
  'companies/inviteUser',
  async ({companyId, userId}: { companyId: number; userId: number }, {rejectWithValue}) => {
    try {
      return await companyApi.inviteUser(companyId, userId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      const errorKey = apiError.response?.data?.message || 'failedToInviteFetch';
      return rejectWithValue(errorKey);
    }
  }
);

const fetchInvitesList = createAsyncThunk(
  'companies/fetchInvitesList',
  async (companyId: number, {rejectWithValue}) => {
    try {
      return await companyApi.getInvitesList(companyId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      const errorKey = apiError.response?.data?.message || 'failedToFetchInvitedUsers';
      return rejectWithValue(errorKey);
    }
  }
);

const cancelInvite = createAsyncThunk<number, number>(
  'companies/cancelInvite',
  async (actionId, { rejectWithValue }) => {
    try {
      await companyApi.cancelInvite(actionId);
      return actionId;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to cancel invite');
    }
  }
);

const fetchRequestsList = createAsyncThunk(
  "companies/fetchRequestsList",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await companyApi.getRequestsList(companyId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || "errors.failedToFetchRequestsList");
    }
  }
);

const acceptRequest = createAsyncThunk<number, number>(
  'companies/acceptRequest',
  async (actionId, { rejectWithValue }) => {
    try {
      const response = await companyApi.acceptRequest(actionId) as IAcceptRequestResponse;
      return response.result.action_id; // Extract action_id from the result property
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to accept request');
    }
  }
);

const cancelRequest = createAsyncThunk<number, number>(
  'companies/cancelRequest',
  async (actionId, { rejectWithValue }) => {
    try {
      await companyApi.cancelInvite(actionId);
      return actionId;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'errors.failedToCancelInvite');
    }
  }
);

const fetchMembersList = createAsyncThunk<IGetMembersListResponse, number, { rejectValue: string }>(
  'companies/fetchMembersList',
  async (companyId, { rejectWithValue }) => {
    try {
      return await companyApi.getMembersList(companyId);
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'errors.failedToFetchMembersList');
    }
  }
);

const deleteMember = createAsyncThunk<number, number>(
  'companies/deleteMember',
  async (actionId, { rejectWithValue }) => {
    try {
      await companyApi.leaveCompany(actionId);
      return actionId;
    } catch (error: unknown) {
      const apiError = error as IApiError;
      return rejectWithValue(apiError.response?.data?.message || 'errors.failedToDeleteMember');
    }
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action: PayloadAction<ICompaniesListResponse>) => {
        state.loading = false;
        state.allCompanies = action.payload.companies;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.loading = false;
        state.companyDetail = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action: PayloadAction<ICompaniesListResponse>) => {
        state.loading = false;
        state.companies = action.payload.companies;
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.loading = false;
        state.error = null;
        state.companyDetail = action.payload;

        const index = state.companies.findIndex((company) => company.company_id === action.payload.company_id);
        if (index !== -1) state.companies[index] = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCompanyVisibility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyVisibility.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.loading = false;
        state.companies = state.companies.map((company) =>
          company.company_id === action.payload.company_id ? action.payload : company
        );
        if (state.companyDetail && state.companyDetail.company_id === action.payload.company_id) {
          state.companyDetail.is_visible = action.payload.is_visible;
        }
      })
      .addCase(updateCompanyVisibility.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(updateCompanyAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyAvatar.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.loading = false;
        state.error = null;

        const index = state.companies.findIndex((company) => company.company_id === action.payload.company_id);
        if (index !== -1) state.companies[index] = action.payload;

        if (state.companyDetail && state.companyDetail.company_id === action.payload.company_id) {
          state.companyDetail = action.payload;
        }
      })
      .addCase(updateCompanyAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        const companyId = action.payload;
        state.companies = state.companies.filter((company) => company.company_id !== companyId);
        state.errorMessage = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(inviteUser.pending, (state) => {
        state.loading = true;
        state.invitedError = null;
      })
      .addCase(inviteUser.fulfilled, (state, action: PayloadAction<IUserListResponse>) => {
        state.loading = false;
        state.invitedUsers = action.payload;
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.loading = false;
        state.invitedError = action.payload as string;
      })
      .addCase(fetchInvitesList.pending, (state) => {
        state.loading = true;
        state.invitesError = null;
      })
      .addCase(fetchInvitesList.fulfilled, (state, action: PayloadAction<IUserListResponse>) => {
        state.loading = false;
        state.invitedUsers = action.payload;
        state.invitesError = null;
      })
      .addCase(fetchInvitesList.rejected, (state, action) => {
        state.loading = false;
        state.invitesError = action.payload as string | null;
      })
      .addCase(cancelInvite.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.invitedUsers?.users) {
          state.invitedUsers.users = state.invitedUsers.users.filter(
            (user) => user.action_id !== action.payload
          );
        }
      })
      .addCase(cancelInvite.rejected, (state, action) => {
        state.invitesError = action.payload as string;
      })
      .addCase(fetchRequestsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestsList.fulfilled, (state, action: PayloadAction<IUserListResponse>) => {
        state.loading = false;
        state.requestsList = action.payload;
      })
      .addCase(fetchRequestsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptRequest.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;

        if (state.requestsList) {
          state.requestsList.users = state.requestsList.users.filter(
            (request) => request.action_id !== action.payload
          );
        }
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelRequest.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        if (state.requestsList && state.requestsList.users) {
          state.requestsList.users = state.requestsList.users.filter(
            (user) => user.action_id !== action.payload
          );
        }
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.loading = false;
        state.invitedError = action.payload as string;
      })
      .addCase(fetchMembersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembersList.fulfilled, (state, action: PayloadAction<IGetMembersListResponse>) => {
        state.loading = false;
        state.membersList = action.payload;
      })
      .addCase(fetchMembersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMember.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        if (state.membersList && state.membersList.result.users) {
          state.membersList.result.users = state.membersList.result.users.filter(
            (user) => user.action_id !== action.payload
          );
        }
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

const {reducer: companyReducer, actions: companyActions} = companySlice;

export {
  companyReducer,
  companyActions,
  fetchAllCompanies,
  fetchCompanyById,
  fetchUserCompanies,
  createCompany,
  updateCompany,
  updateCompanyVisibility,
  updateCompanyAvatar,
  deleteCompany,
  inviteUser,
  fetchInvitesList,
  cancelInvite,
  fetchRequestsList,
  acceptRequest,
  cancelRequest,
  fetchMembersList,
  deleteMember
};
