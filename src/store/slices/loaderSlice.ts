// store/loaderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoaderState {
  globalLoading: boolean;
}

const initialState: LoaderState = {
  globalLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.globalLoading = true;
    },
    hideLoader: (state) => {
      state.globalLoading = false;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
