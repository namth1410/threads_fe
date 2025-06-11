import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../types/api";
import { Me } from "../../types/user";
import { axiosInstance } from "../../utils/axios";

interface MeState {
  me: Me | null;
  loading: boolean;
  error: string | null;
}

const initialState: MeState = {
  me: null,
  loading: false,
  error: null,
};

export const getMe = createAsyncThunk<
  ApiResponse<Me>,
  void,
  { rejectValue: string }
>("me/getMe", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Me>>("/me");
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
});

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    clearMe: (state: MeState) => {
      state.me = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state: MeState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMe.fulfilled,
        (state: MeState, action: PayloadAction<ApiResponse<Me>>) => {
          state.loading = false;
          state.me = action.payload.data;
        }
      )
      .addCase(getMe.rejected, (state: MeState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMe } = meSlice.actions;
export default meSlice.reducer;
