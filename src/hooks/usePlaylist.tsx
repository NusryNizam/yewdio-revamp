import { useEffect } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectPlaylistSlice,
  playNext,
  setNowPlaying,
} from "../features/playlists/playlistSlice";
import { AUDIO_QUALITY } from "../services/search.types";
import { getAudioUrl } from "../utils/utils";

export const usePlaylist = () => {
  const { load, isReady } = useGlobalAudioPlayer();
  const dispatch = useAppDispatch();
  const { currentPlaylist, playingIndex } = useAppSelector(selectPlaylistSlice);

  useEffect(() => {
    if (currentPlaylist && playingIndex > -1 && isReady) {
      load(
        getAudioUrl(
          AUDIO_QUALITY.HIGH,
          currentPlaylist[playingIndex].downloadUrl,
        ),
        {
          autoplay: true,
          onend: () => {
            dispatch(playNext());
          },
        },
      );
      dispatch(setNowPlaying(currentPlaylist[playingIndex]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylist, playingIndex]);
};
