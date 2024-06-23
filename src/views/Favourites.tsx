import { ListVideoIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SongCard from "../components/SongCard";
import {
  playFavourites,
  playNext,
  selectFavourites,
} from "../features/playlists/playlistSlice";
import { openSheet, setSheetData } from "../features/settings/settingSlice";
import { usePlayer } from "../hooks/usePlayer";
import { Song } from "../services/searchBySong.types";
import "./Favourites.css";

const Favourites = () => {
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();

  const { playAudio, playLoaded } = usePlayer({
    onend: () => {
      dispatch(playNext());
      setTimeout(() => {
        playLoaded();
      }, 500);
    },
  });

  const handleMoreOptions = (data: Song) => {
    dispatch(openSheet());
    dispatch(setSheetData(data));
  };

  const handlePlayFavourites = () => {
    dispatch(playFavourites());
    setTimeout(() => {
      playLoaded();
    }, 500);
  };

  return (
    <div className="Favourites">
      <header className="search-header">
        <h2 className="title">Favourites</h2>
      </header>

      {favourites.length > 0 ? (
        <div className="fav-container">
          <div className="songs-container">
            {favourites.map((song) => (
              <SongCard
                key={song.id}
                data={song}
                onPress={() => playAudio(song)}
                isMoreOptions={true}
                onPressMore={() => handleMoreOptions(song)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-light">You don't have any favourites added.</div>
      )}

      {favourites.length > 0 ? (
        <button className="play-all" onClick={handlePlayFavourites}>
          <ListVideoIcon size={20} color={"black"} />
          Play All
        </button>
      ) : null}
    </div>
  );
};

export default Favourites;
