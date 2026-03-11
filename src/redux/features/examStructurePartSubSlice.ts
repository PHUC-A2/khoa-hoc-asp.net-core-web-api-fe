import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ICauTrucDeThanhPhanSub } from "../../types/CauTrucDeThanhPhanSub";
import { getPartSubsByPart } from "../../config/Api";

interface State {
    loading: boolean;
    result: ICauTrucDeThanhPhanSub[];
    error?: string;
}

const initialState: State = {
    loading: false,
    result: []
};

export const fetchPartSubs = createAsyncThunk<
    ICauTrucDeThanhPhanSub[],
    number,
    { rejectValue: string }
>(
    "examStructurePartSub/fetchByPart",
    async (partId, { rejectWithValue }) => {
        try {
            const res = await getPartSubsByPart(partId);

            if (res.data.statusCode === 200 && res.data.data) {
                return res.data.data;
            }

            return rejectWithValue(res.data.message || "Lỗi lấy sub");
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Lỗi hệ thống"
            );
        }
    }
);

export const examStructurePartSubSlice = createSlice({
    name: "examStructurePartSub",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartSubs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPartSubs.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(fetchPartSubs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectPartSubs = (state: RootState) => state.examStructurePartSub.result;
export const selectPartSubsLoading = (state: RootState) => state.examStructurePartSub.loading;

export default examStructurePartSubSlice.reducer;