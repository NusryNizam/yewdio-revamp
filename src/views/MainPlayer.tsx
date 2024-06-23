import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  RedoIcon,
  SkipBackIcon,
  SkipForwardIcon,
  UndoIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
  selectNowPlaying,
} from "../features/playlists/playlistSlice";
import { IMAGE_QUALITY } from "../services/search.types";
import { getImageUrl } from "../utils/utils";
import "./MainPlayer.css";
import IconButton from "../components/IconButton";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useMemo } from "react";
import { Song } from "../services/searchBySong.types";

const MainPlayer = () => {
  const nowPlaying = useAppSelector(selectNowPlaying);
  const { playing, togglePlayPause, seek, getPosition } =
    useGlobalAudioPlayer();
  const dispatch = useAppDispatch();

  const favourites = useAppSelector(selectFavourites);

  const isFavourite = useMemo(
    () => favourites.some((fav) => fav.id === nowPlaying?.id),
    [favourites, nowPlaying?.id],
  );

  const handleAddToFavourites = (data: Song) => {
    dispatch(addToFavourites(data));
  };

  const handleremoveFromFavourites = (data: Song) => {
    dispatch(removeFromFavourites(data));
  };

  const seekForward = () => {
    seek(getPosition() + 10);
  };

  const seekBackward = () => {
    seek(getPosition() - 10);
  };

  return (
    <div className="MainPlayer">
      {nowPlaying ? (
        <>
          <div className="album-art-container">
            <img
              src={getImageUrl(IMAGE_QUALITY.HIGH, nowPlaying.image)}
              alt="album-art"
            />
          </div>
          <div className="details-container player-details">
            <h4 className="song-title overflow-prevent">{nowPlaying?.name}</h4>
            <p className="regular-text overflow-prevent">
              {nowPlaying?.artists?.primary.map((artist) => `${artist?.name} `)}
            </p>
          </div>
          <div className="player-controls">
            <IconButton Icon={SkipBackIcon} />
            {playing ? (
              <IconButton
                Icon={PauseIcon}
                backgroundColor="#2e2e2e"
                onPress={togglePlayPause}
              />
            ) : (
              <IconButton
                Icon={PlayIcon}
                backgroundColor="#2e2e2e"
                onPress={togglePlayPause}
              />
            )}
            <IconButton Icon={SkipForwardIcon} />
          </div>
          <div className="player-controls extra-controls">
            <IconButton Icon={UndoIcon} size={20} onPress={seekBackward} />
            {isFavourite ? (
              <IconButton
                Icon={HeartIcon}
                fill="red"
                color="red"
                size={20}
                onPress={() => handleremoveFromFavourites(nowPlaying)}
              />
            ) : (
              <IconButton
                Icon={HeartIcon}
                size={20}
                onPress={() => handleAddToFavourites(nowPlaying)}
              />
            )}
            <IconButton Icon={RedoIcon} size={20} onPress={seekForward} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MainPlayer;
