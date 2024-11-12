import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IPagination} from "../../models/IUser";
import {IApiError} from "../../types/api-types/errorTypes";
import {companyApi} from "../../api/company-api";
import {ICompaniesListResponse, ICompany} from "../../models/ICompany";

interface CompanyState {
    companies: ICompany[];
    companyDetail: ICompany | null;
    loading: boolean;
    error: string | null;
    errorMessage: string | null;
    pagination: IPagination | null;
    avatar: string | null;
}

const initialState: CompanyState = {
    companies: [],
    companyDetail: null,
    loading: false,
    error: null,
    errorMessage: null,
    pagination: null,
    avatar: null,
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
            return await companyApi.getCompaniesByUserId(userId);
        } catch (error: unknown) {
            const apiError = error as IApiError;
            const errorMessage = apiError.response?.data?.message || 'failedToFetch';
            return rejectWithValue(errorMessage);
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

const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCompanies.fulfilled, (state, action: PayloadAction<ICompaniesListResponse>) => {
                state.loading = false;
                state.companies = action.payload.companies;
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
            .addCase(createCompany.fulfilled, (state, action: PayloadAction<{ company_id: number }>) => {
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
            });
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
};
