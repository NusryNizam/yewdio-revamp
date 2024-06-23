import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Song } from "../../services/searchBySong.types";
import { RootState } from "../../app/store";

interface settingState {
  isSheetOpen: boolean;
  isPlayerOpen: boolean;
  sheetData?: Song;
  searchTerm: string;
  isLightTheme: boolean;
}

const initialState: settingState = {
  isSheetOpen: false,
  isPlayerOpen: false,
  searchTerm: "",
  isLightTheme: false,
};

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSheetData: (state, action: PayloadAction<Song>) => {
      state.sheetData = action.payload;
    },
    clearSheetData: (state) => {
      state.sheetData = undefined;
    },
    openSheet: (state) => {
      state.isSheetOpen = true;
    },
    closeSheet: (state) => {
      state.isSheetOpen = false;
    },

    showPlayer: (state) => {
      state.isPlayerOpen = true;
    },
    minimizePlayer: (state) => {
      state.isPlayerOpen = false;
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isLightTheme = action.payload;
    },
  },
});

export const {
  setSheetData,
  clearSheetData,
  openSheet,
  closeSheet,
  setSearchTerm,
  showPlayer,
  minimizePlayer,
  setTheme,
} = settingSlice.actions;

export const selectSettings = (state: RootState) =>
  state.persistedReducer.settings;

export default settingSlice.reducer;
