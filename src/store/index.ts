import { configureStore } from "@reduxjs/toolkit";
import meReducer from "./slices/meSlice";
import threadReducer from "./slices/threadSlice";
import loaderReducer from "./slices/loaderSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    me: meReducer,
    threads: threadReducer,
    loader: loaderReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
