// store/slices/threadSlice.ts
import { PaginatedResponse, PaginationMeta } from "@/types/api";
import { ThreadResponseDto } from "@/types/thread";
import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ThreadState {
  threads: ThreadResponseDto[];
  meta: PaginationMeta | null;
}

const initialState: ThreadState = {
  threads: [],
  meta: null,
};

export const fetchThreads = createAsyncThunk("threads/fetchAll", async () => {
  const res = await axiosInstance.get<PaginatedResponse<ThreadResponseDto>>(
    `/threads`
  );
  return res.data;
});

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, () => {})
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.threads = action.payload.data;
        state.meta = action.payload.pagination;
      })
      .addCase(fetchThreads.rejected, () => {});
  },
});

export default threadSlice.reducer;
