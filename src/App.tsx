import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./views/Main";
import Sidebar from "./views/Sidebar";
import Favourites from "./views/Favourites";
import Search from "./views/Search";
import Player from "./views/Player";
import { Sheet } from "react-modal-sheet";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  clearSheetData,
  closeSheet,
  minimizePlayer,
  selectSettings,
  setTheme,
} from "./features/settings/settingSlice";
import SheetButton from "./components/SheetButton";
import { Heart, HeartCrack, PlayCircle } from "lucide-react";
import SongCard from "./components/SongCard";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "./features/playlists/playlistSlice";
import { Song } from "./services/searchBySong.types";
import { Toaster } from "react-hot-toast";
import { useCallback, useEffect, useMemo } from "react";
import { usePlayer } from "./hooks/usePlayer";
import MainPlayer from "./views/MainPlayer";
import { usePlaylist } from "./hooks/usePlaylist";

function App() {
  const { isSheetOpen, sheetData, isPlayerOpen } =
    useAppSelector(selectSettings);
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();
  const { playAudio } = usePlayer();
  usePlaylist();

  const handleCloseSheet = () => {
    dispatch(closeSheet());
    dispatch(clearSheetData());
  };

  const handleMinimizePlayer = () => {
    dispatch(minimizePlayer());
  };

  const handlePlay = (songData: Song) => {
    playAudio(songData);
    handleCloseSheet();
  };

  const isFavourite = useMemo(
    () => favourites.some((fav) => fav.id === sheetData?.id),
    [favourites, sheetData?.id],
  );

  const handleAddToFavourites = (data: Song) => {
    dispatch(addToFavourites(data));
    handleCloseSheet();
  };

  const handleremoveFromFavourites = (data: Song) => {
    dispatch(removeFromFavourites(data));
    handleCloseSheet();
  };

  const updateTheme = useCallback(
    (data: MediaQueryList): void => {
      dispatch(setTheme(data.matches));
    },
    [dispatch],
  );

  useEffect(() => {
    const lightScheme = window.matchMedia("(prefers-color-scheme: light)");
    lightScheme.addEventListener("change", () => updateTheme(lightScheme));

    return () =>
      lightScheme.removeEventListener("change", () => updateTheme(lightScheme));
  }, [dispatch, updateTheme]);

  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <Player />

      <Sheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        className="sheet-container"
        snapPoints={[0.36]}
      >
        <Sheet.Container className="">
          <Sheet.Header
            className="sheet sheet-header"
            onTap={handleCloseSheet}
          ></Sheet.Header>
          <Sheet.Content className="sheet sheet-content">
            {sheetData ? (
              <>
                <div className="details-wrapper">
                  <SongCard data={sheetData} />
                  <div className="divider"></div>
                </div>
                <SheetButton
                  Icon={PlayCircle}
                  text="Play"
                  onPress={() => handlePlay(sheetData)}
                />
                {isFavourite ? (
                  <SheetButton
                    Icon={HeartCrack}
                    text="Remove from favourites"
                    onPress={() => handleremoveFromFavourites(sheetData)}
                  />
                ) : (
                  <SheetButton
                    Icon={Heart}
                    text="Add to favourites"
                    onPress={() => handleAddToFavourites(sheetData)}
                  />
                )}
              </>
            ) : null}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <Sheet
        isOpen={isPlayerOpen}
        onClose={handleMinimizePlayer}
        className="sheet-container"
        snapPoints={[1]}
      >
        <Sheet.Container className="">
          <Sheet.Header
            className="sheet sheet-header"
            onTap={handleMinimizePlayer}
          />
          <Sheet.Content className="sheet sheet-content">
            <MainPlayer />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <Toaster
        toastOptions={{
          style: {
            background: "#1d1d1d",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
