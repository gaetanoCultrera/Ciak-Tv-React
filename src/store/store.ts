import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";
import favoriteSlice from "./favoriteSlice";
import { filmApi } from "../services/film";

export const store = configureStore({
  reducer: {
    objectSignUp: signupSlice,
    [filmApi.reducerPath]: filmApi.reducer,
    favoriteItems: favoriteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
