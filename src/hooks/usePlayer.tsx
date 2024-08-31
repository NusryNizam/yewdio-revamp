import { AudioLoadOptions, useGlobalAudioPlayer } from "react-use-audio-player";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  abortPlaylist,
  playNext,
  playPrevious,
  selectNowPlaying,
  setNowPlaying,
} from "../features/playlists/playlistSlice";
import { Song } from "../services/searchBySong.types";
import { AUDIO_QUALITY, IMAGE_QUALITY } from "../services/search.types";
import {
  getAudioUrl,
  getImageUrl,
  replaceQuotePlaceholders,
} from "../utils/utils";
import { useCallback, useEffect } from "react";

export const usePlayer = (config?: AudioLoadOptions) => {
  const { load, stop, getPosition, seek, play, pause, isLoading, playing } =
    useGlobalAudioPlayer();
  const dispatch = useAppDispatch();
  const nowPlaying = useAppSelector(selectNowPlaying);

  const playAudio = (songData: Song) => {
    load(getAudioUrl(AUDIO_QUALITY.HIGH, songData.downloadUrl), {
      autoplay: config?.autoplay ?? true,
      html5: true,
      format: "mp3",
      ...config,
    });
    dispatch(setNowPlaying(songData));
    dispatch(abortPlaylist());
  };

  const playLoaded = useCallback(() => {
    if (nowPlaying) {
      load(getAudioUrl(AUDIO_QUALITY.HIGH, nowPlaying.downloadUrl), {
        autoplay: true,
        html5: true,
        format: "mp3",
        ...config,
      });
      navigator.mediaSession.playbackState = "playing";
    }
  }, [config, load, nowPlaying]);

  const seekForward = useCallback(() => {
    seek(getPosition() + 10);
  }, [getPosition, seek]);

  const seekBackward = useCallback(() => {
    seek(getPosition() - 10);
  }, [getPosition, seek]);

  const playNextSong = useCallback(() => {
    dispatch(playNext());
  }, [dispatch]);

  const playPreviousSong = useCallback(() => {
    dispatch(playPrevious());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      navigator.mediaSession.playbackState = "none";
      return;
    }

    if (playing) {
      navigator.mediaSession.playbackState = "playing";
    } else {
      navigator.mediaSession.playbackState = "paused";
    }
  }, [isLoading, playing]);

  useEffect(() => {
    const artistNames =
      nowPlaying?.artists.primary.map((artist) => artist.name).join(", ") ?? "";
    const albumName = nowPlaying?.album.name ?? "";
    const imageUrl = getImageUrl(IMAGE_QUALITY.HIGH, nowPlaying?.image ?? []);

    if ("mediaSession" in navigator && nowPlaying) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: replaceQuotePlaceholders(nowPlaying.name),
        artist: replaceQuotePlaceholders(artistNames),
        album: replaceQuotePlaceholders(albumName),
        artwork: [
          {
            src: imageUrl,
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", play);
      navigator.mediaSession.setActionHandler("nexttrack", playNextSong);
      navigator.mediaSession.setActionHandler(
        "previoustrack",
        playPreviousSong,
      );
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("seekbackward", seekBackward);
      navigator.mediaSession.setActionHandler("seekforward", seekForward);
      navigator.mediaSession.setActionHandler("stop", stop);
    }
  }, [
    playNextSong,
    playPreviousSong,
    nowPlaying,
    pause,
    play,
    seekBackward,
    seekForward,
    stop,
  ]);

  return {
    playAudio,
    playLoaded,
    seekForward,
    seekBackward,
    playNextSong,
    playPreviousSong,
  };
};
