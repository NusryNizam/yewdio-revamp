import {
  HeartIcon,
  LoaderCircle,
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
import { getImageUrl, replaceQuotePlaceholders } from "../utils/utils";
import "./MainPlayer.css";
import IconButton from "../components/IconButton";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useEffect, useMemo, useState } from "react";
import { Song } from "../services/searchBySong.types";
import { usePlayer } from "../hooks/usePlayer";
import { selectSettings } from "../features/settings/settingSlice";

const MainPlayer = () => {
  const nowPlaying = useAppSelector(selectNowPlaying);
  const { playing, play, pause, getPosition, isLoading, duration, isReady } =
    useGlobalAudioPlayer();
  const dispatch = useAppDispatch();
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const { playLoaded } = usePlayer();
  const { isLightTheme } = useAppSelector(selectSettings);
  const { seekBackward, seekForward } = usePlayer();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedPercentage(Math.round((getPosition() / duration) * 100));
    }, 1000);

    if (!playing) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [duration, getPosition, playing]);

  return (
    <div className="MainPlayer">
      {nowPlaying ? (
        <>
          <span
            className="seeker-main"
            style={{ width: `${completedPercentage}%` }}
          ></span>

          <div className="album-art-container">
            <img
              src={getImageUrl(IMAGE_QUALITY.HIGH, nowPlaying.image)}
              alt="album-art"
            />
          </div>

          <div className="album-art-container-blurred">
            <img
              src={getImageUrl(IMAGE_QUALITY.HIGH, nowPlaying.image)}
              alt="album-art"
            />
          </div>

          <div className="details-container player-details">
            <h4 className="song-title overflow-prevent-player">
              {replaceQuotePlaceholders(nowPlaying?.name ?? "")}
            </h4>
            <p className="regular-text overflow-prevent-player">
              {nowPlaying?.artists?.primary
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>

          <div className="player-controls">
            <IconButton Icon={SkipBackIcon} buttonName="play previous song" />
            {isLoading ? (
              <IconButton
                Icon={LoaderCircle}
                backgroundColor={isLightTheme ? "#e8e8e8" : "#2e2e2e"}
                disabled={true}
                className="loader"
                buttonName="song loading"
              />
            ) : playing ? (
              <IconButton
                Icon={PauseIcon}
                backgroundColor={isLightTheme ? "#e8e8e8" : "#2e2e2e"}
                onPress={pause}
                buttonName="pause song"
              />
            ) : (
              <IconButton
                Icon={PlayIcon}
                backgroundColor={isLightTheme ? "#e8e8e8" : "#2e2e2e"}
                onPress={isReady ? play : playLoaded}
                buttonName="play song"
              />
            )}
            <IconButton Icon={SkipForwardIcon} buttonName="play next song" />
          </div>
          <div className="player-controls extra-controls">
            <IconButton
              Icon={UndoIcon}
              size={20}
              onPress={seekBackward}
              buttonName="seek backwards"
            />
            {isFavourite ? (
              <IconButton
                Icon={HeartIcon}
                fill="red"
                color="red"
                size={20}
                onPress={() => handleremoveFromFavourites(nowPlaying)}
                buttonName="remove from favourites"
              />
            ) : (
              <IconButton
                Icon={HeartIcon}
                size={20}
                onPress={() => handleAddToFavourites(nowPlaying)}
                buttonName="add to favourites"
              />
            )}
            <IconButton
              Icon={RedoIcon}
              size={20}
              onPress={seekForward}
              buttonName="seek forwards"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MainPlayer;
