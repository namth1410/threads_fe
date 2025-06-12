import { configureStore } from "@reduxjs/toolkit";
import meReducer from "./slices/meSlice";
import threadReducer from "./slices/threadSlice";

export const store = configureStore({
  reducer: {
    me: meReducer,
    threads: threadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
