import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import SongCard from "../components/SongCard";
import { selectFavourites } from "../features/playlists/playlistSlice";
import { usePlayer } from "../hooks/usePlayer";
import "./Main.css";

export const Main = () => {
  const favourites = useAppSelector(selectFavourites);
  const { playAudio } = usePlayer();

  return (
    <div className="Main">
      <header className="search-header">
        <h2 className="title">Home</h2>
      </header>

      <div>
        <p className="regular-medium-text bottom-gap">Favourites</p>

        {favourites.length > 0 ? (
          <>
            <div className="fav-container">
              <div className="songs-container">
                {favourites.slice(0, 5).map((song) => (
                  <SongCard
                    key={song.id}
                    data={song}
                    onPress={() => playAudio(song)}
                    isMoreOptions={false}
                  />
                ))}
              </div>
            </div>

            <Link to="favourites" className="show-link">
              Show All
            </Link>
          </>
        ) : (
          <div className="text-light">You don't have any favourites added.</div>
        )}
      </div>
    </div>
  );
};
