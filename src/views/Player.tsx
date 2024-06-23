import { useGlobalAudioPlayer } from "react-use-audio-player";
import "./Player.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectNowPlaying } from "../features/playlists/playlistSlice";
import SongCard from "../components/SongCard";
import { LoaderCircle, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { showPlayer } from "../features/settings/settingSlice";
import { usePlayer } from "../hooks/usePlayer";

const Player = () => {
  const {
    togglePlayPause,
    playing,
    duration,
    getPosition,
    isLoading,
    isReady,
  } = useGlobalAudioPlayer();
  const nowPlaying = useAppSelector(selectNowPlaying);
  const dispatch = useAppDispatch();
  const { playLoaded } = usePlayer();

  const [completedPercentage, setCompletedPercentage] = useState(0);

  const handleOpenPlayer = () => {
    dispatch(showPlayer());
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
    <div className="Player">
      {nowPlaying ? (
        <>
          <span
            className="seeker"
            style={{ width: `${completedPercentage}%` }}
          ></span>

          <SongCard data={nowPlaying} onPress={handleOpenPlayer} />
        </>
      ) : (
        <span className="text-light">Select a song to play</span>
      )}
      <button
        onClick={isReady ? togglePlayPause : playLoaded}
        className="main-control-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderCircle size={24} color="white" className="loader" />
        ) : playing ? (
          <Pause size={24} color="white" />
        ) : (
          <Play size={24} color="white" />
        )}
      </button>
    </div>
  );
};

export default Player;
