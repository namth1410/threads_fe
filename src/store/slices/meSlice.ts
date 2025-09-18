import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { APIErrorResponse, ApiResponse } from "../../types/api";
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
  { rejectValue: APIErrorResponse }
>("me/getMe", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Me>>("/me");
    return data;
  } catch (err) {
    const error = err as AxiosError<APIErrorResponse>;
    if (error.response?.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue({
      message: "Unknown error",
      error: "Internal Error",
      statusCode: 500,
    });
  }
});

export const changePassword = createAsyncThunk<
  ApiResponse<string>, // response trả về có thể là message dạng string
  { currentPassword: string; newPassword: string },
  { rejectValue: APIErrorResponse }
>("me/changePassword", async (body, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<ApiResponse<string>>(
      "/auth/change-password",
      body
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<APIErrorResponse>;
    if (error.response?.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue({
      message: "Unknown error",
      error: "Internal Error",
      statusCode: 500,
    });
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
      .addCase(getMe.rejected, (state: MeState) => {
        state.loading = false;
      });
  },
});

export const { clearMe } = meSlice.actions;
export default meSlice.reducer;
