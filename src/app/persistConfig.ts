import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import playlistSlice from "../features/playlists/playlistSlice";
import settingSlice from "../features/settings/settingSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["playlists"], // only persist the 'playlists' slice
};

const rootReducer = combineReducers({
  playlists: playlistSlice,
  settings: settingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
