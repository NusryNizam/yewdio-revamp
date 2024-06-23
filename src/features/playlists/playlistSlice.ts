import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Song } from "../../services/searchBySong.types";
import { RootState } from "../../app/store";
import toast from "react-hot-toast";

interface playlistState {
  nowPlaying: Song | undefined;
  favourites: Song[];
  playingIndex: number;
}

// Define the initial state using that type
const initialState: playlistState = {
  nowPlaying: undefined,
  favourites: [],
  playingIndex: -1,
};

export const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    // createPlaylist: (state) => {},
    // removePlaylist: (state) => {},
    addToFavourites: (state, action: PayloadAction<Song>) => {
      const item = action.payload;
      const exists = state.favourites.some(
        (favourite) => favourite.id === item.id,
      );

      if (!exists) {
        toast.success("Added to favourites!");
        state.favourites = [...state.favourites, item];
      } else {
        toast("Already in favourites");
      }
    },

    removeFromFavourites: (state, action) => {
      const id = action.payload.id;

      state.favourites = state.favourites.filter(
        (favourite) => favourite.id !== id,
      );
      toast.success("Removed from favourites!");
    },

    setNowPlaying: (state, action: PayloadAction<Song>) => {
      state.nowPlaying = action.payload;
    },

    playNext: (state) => {
      if (state.favourites.length > 0) {
        state.playingIndex =
          state.playingIndex !== undefined
            ? (state.playingIndex + 1) % state.favourites.length
            : 0;
        state.nowPlaying = state.favourites[state.playingIndex];
      }
    },

    playPrevious: (state) => {
      if (state.favourites.length > 0) {
        state.playingIndex =
          state.playingIndex !== undefined
            ? (state.playingIndex - 1 + state.favourites.length) %
              state.favourites.length
            : state.favourites.length - 1;
        state.nowPlaying = state.favourites[state.playingIndex];
      }
    },

    playFavourites: (state) => {
      if (state.favourites.length > 0) {
        state.playingIndex = 0;
        state.nowPlaying = state.favourites[0];
      }
    },
  },
});

export const {
  // createPlaylist,
  // removePlaylist,
  setNowPlaying,
  addToFavourites,
  removeFromFavourites,
  playNext,
  playPrevious,
  playFavourites,
} = playlistSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export const selectNowPlaying = (state: RootState) =>
  state.persistedReducer.playlists.nowPlaying;

export const selectFavourites = (state: RootState) =>
  state.persistedReducer.playlists.favourites;

export default playlistSlice.reducer;
