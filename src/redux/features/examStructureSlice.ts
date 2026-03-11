import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
    getAllExamStructures,
    getDeletedExamStructures
} from '../../config/Api';
import type { ICauTrucDe } from '../../types/CauTrucDe';

interface ExamStructureState {
    loading: boolean;
    error?: string;
    result: ICauTrucDe[];
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    deletedList: ICauTrucDe[];
    deletedLoading: boolean;
}

const initialState: ExamStructureState = {
    result: [],
    loading: false,
    meta: {
        page: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    },
    deletedList: [],
    deletedLoading: false
};

export const fetchExamStructures = createAsyncThunk<
    { result: ICauTrucDe[]; meta: ExamStructureState['meta'] },
    string,
    { rejectValue: string }
>(
    'examStructure/fetchExamStructures',
    async (query, { rejectWithValue }) => {
        try {
            const res = await getAllExamStructures(query);
            if (res.data.statusCode === 200 && res.data.data) {
                return {
                    result: res.data.data.result,
                    meta: res.data.data.meta
                };
            }
            return rejectWithValue(res.data.message || 'Lấy cấu trúc đề thất bại');
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Lỗi hệ thống');
        }
    }
);

export const fetchDeletedExamStructures = createAsyncThunk<
    ICauTrucDe[],
    void,
    { rejectValue: string }
>(
    'examStructure/fetchDeleted',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getDeletedExamStructures();
            if (res.data.statusCode === 200 && res.data.data) {
                return res.data.data;
            }
            return rejectWithValue(res.data.message || 'Lấy danh sách đã xóa thất bại');
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Lỗi hệ thống');
        }
    }
);

export const examStructureSlice = createSlice({
    name: 'examStructure',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamStructures.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchExamStructures.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload.result;
                state.meta = action.payload.meta;
            })
            .addCase(fetchExamStructures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDeletedExamStructures.pending, (state) => {
                state.deletedLoading = true;
            })
            .addCase(fetchDeletedExamStructures.fulfilled, (state, action) => {
                state.deletedLoading = false;
                state.deletedList = action.payload;
            })
            .addCase(fetchDeletedExamStructures.rejected, (state) => {
                state.deletedLoading = false;
            });
    }
});

export const selectExamStructures = (state: RootState) => state.examStructure.result;
export const selectExamStructureMeta = (state: RootState) => state.examStructure.meta;
export const selectExamStructureLoading = (state: RootState) => state.examStructure.loading;
export const selectDeletedExamStructures = (state: RootState) => state.examStructure.deletedList;
export const selectDeletedExamStructureLoading = (state: RootState) => state.examStructure.deletedLoading;

export default examStructureSlice.reducer;