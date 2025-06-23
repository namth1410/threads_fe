// store/slices/threadSlice.ts
import { ApiResponse, PaginatedResponse, PaginationMeta } from "@/types/api";
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
  const res =
    await axiosInstance.get<PaginatedResponse<ThreadResponseDto>>(`/threads`);
  return res.data;
});

export const createThread = createAsyncThunk(
  "threads/create",
  async (payload: { content: string; files: File[] }) => {
    const formData = new FormData();
    formData.append("content", payload.content);
    payload.files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await axiosInstance.post<ApiResponse<ThreadResponseDto>>(
      "/threads",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.data;
  }
);

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
