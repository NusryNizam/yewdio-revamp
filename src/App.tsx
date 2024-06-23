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
  selectSettings,
} from "./features/settings/settingSlice";
import SheetButton from "./components/SheetButton";
import { Heart, HeartCrack, PlayCircle, XIcon } from "lucide-react";
import SongCard from "./components/SongCard";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "./features/playlists/playlistSlice";
import { Song } from "./services/searchBySong.types";
import { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import { usePlayer } from "./hooks/usePlayer";

function App() {
  const { isSheetOpen, sheetData } = useAppSelector(selectSettings);
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();
  const { playAudio } = usePlayer();

  const handleCloseSheet = () => {
    dispatch(closeSheet());
    dispatch(clearSheetData());
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
  };

  const handleremoveFromFavourites = (data: Song) => {
    dispatch(removeFromFavourites(data));
  };

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
        snapPoints={[0.4]}
      >
        <Sheet.Container className="">
          <Sheet.Header className="sheet sheet-header">
            <button className="close-button" onClick={handleCloseSheet}>
              <XIcon />
            </button>
          </Sheet.Header>
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
