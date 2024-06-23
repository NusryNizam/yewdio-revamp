import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "../services/searchService";
import playlistSlice from "../features/playlists/playlistSlice";
import settingSlice from "../features/settings/settingSlice";

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    playlists: playlistSlice,
    settings: settingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
