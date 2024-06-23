import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "../services/searchService";
import persistedReducer from "./persistConfig";
import persistStore from "redux-persist/es/persistStore";

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(searchApi.middleware),
});

export const persistor = persistStore(store);

// Infer  the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
