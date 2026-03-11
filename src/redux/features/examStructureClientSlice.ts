import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getClientExamStructures, getClientExamStructureById } from "../../config/Api";
import type { ICauTrucDe } from "../../types/CauTrucDe";

interface ExamStructureClientState {
    list: ICauTrucDe[];
    listLoading: boolean;
    detail: ICauTrucDe | null;
    detailLoading: boolean;
    error?: string;
}

const initialState: ExamStructureClientState = {
    list: [],
    listLoading: false,
    detail: null,
    detailLoading: false
};

export const fetchClientExamStructures = createAsyncThunk<
ICauTrucDe[],
    void,
    { rejectValue: string }
    > (
        "examStructureClient/fetchAll",
        async (_, { rejectWithValue }) => {
            try {
                const res = await getClientExamStructures();
                if (res.data.statusCode === 200 && res.data.data) {
                    return res.data.data.result as ICauTrucDe[]; // ← chỉ trả về result, không return object
                }
                return rejectWithValue(res.data.message || "Lấy danh sách thất bại");
            } catch (error: any) {
                return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
            }
        }
    );

export const fetchClientExamStructureById = createAsyncThunk<
    ICauTrucDe,
    number,
    { rejectValue: string }
>(
    "examStructureClient/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getClientExamStructureById(id);
            if (res.data.statusCode === 200 && res.data.data) {
                return res.data.data;
            }
            return rejectWithValue(res.data.message || "Lấy thông tin thất bại");
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);

const examStructureClientSlice = createSlice({
    name: "examStructureClient",
    initialState,
    reducers: {
        clearDetail: (state) => {
            state.detail = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientExamStructures.pending, (state) => {
                state.listLoading = true;
                state.error = undefined;
            })
            .addCase(fetchClientExamStructures.fulfilled, (state, action) => {
                state.listLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchClientExamStructures.rejected, (state, action) => {
                state.listLoading = false;
                state.error = action.payload as string | undefined;
            })
            .addCase(fetchClientExamStructureById.pending, (state) => {
                state.detailLoading = true;
                state.error = undefined;
            })
            .addCase(fetchClientExamStructureById.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.detail = action.payload;
            })
            .addCase(fetchClientExamStructureById.rejected, (state, action) => {
                state.detailLoading = false;
                state.error = action.payload as string | undefined;
            });
    }
});

export const { clearDetail } = examStructureClientSlice.actions;

export const selectClientExamStructures = (state: RootState) => state.examStructureClient.list;
export const selectClientExamStructuresLoading = (state: RootState) => state.examStructureClient.listLoading;
export const selectClientExamStructureDetail = (state: RootState) => state.examStructureClient.detail;
export const selectClientExamStructureDetailLoading = (state: RootState) => state.examStructureClient.detailLoading;

export default examStructureClientSlice.reducer;