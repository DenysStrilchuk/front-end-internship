import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPagination } from "../../models/IUser";
import { IApiError } from "../../types/api-types/errorTypes";
import { companyApi } from "../../api/company-api";
import { ICompaniesListResponse, ICompany } from "../../models/ICompany";

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
    async ({ page, pageSize }: { page: number; pageSize: number }, { rejectWithValue }) => {
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
    async (companyId: number, { rejectWithValue }) => {
        try {
            return await companyApi.getCompanyById(companyId);
        } catch (error: unknown) {
            const apiError = error as IApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch company');
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
            });
    }
});

const { reducer: companyReducer, actions: companyActions } = companySlice;

export {
    companyReducer,
    companyActions,
    fetchAllCompanies,
    fetchCompanyById,
};
