import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getAllExamStructures } from '../../config/Api';
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
}

const initialState: ExamStructureState = {
    result: [],
    loading: false,
    meta: {
        page: 1,
        pageSize: 10,
        pages: 0,
        total: 0,
    },
};

export const fetchExamStructures = createAsyncThunk<
    { result: ICauTrucDe[]; meta: ExamStructureState["meta"] },
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

            return rejectWithValue(res.data.message || "Lấy cấu trúc đề thất bại");
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(
                error?.response?.data?.message || "Lỗi hệ thống"
            );
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
                const { result, meta } = action.payload;
                state.loading = false;
                state.result = result;
                state.meta = meta;
            })
            .addCase(fetchExamStructures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectExamStructures = (state: RootState) => state.examStructure.result;
export const selectExamStructureMeta = (state: RootState) => state.examStructure.meta;
export const selectExamStructureLoading = (state: RootState) => state.examStructure.loading;

export default examStructureSlice.reducer;
