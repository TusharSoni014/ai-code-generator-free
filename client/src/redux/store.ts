import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import codeGeneration from "./slices/codeGeneration";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    codeGenerationSlice: codeGeneration,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
