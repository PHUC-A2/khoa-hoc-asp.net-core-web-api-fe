import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ICauTrucDeThanhPhan } from "../../types/CauTrucDeThanhPhan";
import { getExamStructurePartsByStructure } from "../../config/Api";

interface State {
    loading: boolean;
    result: ICauTrucDeThanhPhan[];
    error?: string;
}

const initialState: State = {
    loading: false,
    result: []
};

export const fetchPartsByStructure = createAsyncThunk<
    ICauTrucDeThanhPhan[],
    number,
    { rejectValue: string }
>(
    "examStructurePart/fetchByStructure",
    async (structureId, { rejectWithValue }) => {
        try {
            const res = await getExamStructurePartsByStructure(structureId);

            if (res.data.statusCode === 200 && res.data.data) {
                return res.data.data;
            }

            return rejectWithValue(res.data.message || "Lỗi lấy part");
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Lỗi hệ thống"
            );
        }
    }
);

export const examStructurePartSlice = createSlice({
    name: "examStructurePart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartsByStructure.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPartsByStructure.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(fetchPartsByStructure.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectParts = (state: RootState) => state.examStructurePart.result;
export const selectPartsLoading = (state: RootState) => state.examStructurePart.loading;

export default examStructurePartSlice.reducer;