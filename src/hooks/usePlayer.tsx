import { AudioLoadOptions, useGlobalAudioPlayer } from "react-use-audio-player";
import { useAppDispatch } from "../app/hooks";
import { setNowPlaying } from "../features/playlists/playlistSlice";
import { Song } from "../services/searchBySong.types";
import { AUDIO_QUALITY } from "../services/search.types";
import { getAudioUrl } from "../utils/utils";

export const usePlayer = (config?: AudioLoadOptions) => {
  const { load } = useGlobalAudioPlayer();
  const dispatch = useAppDispatch();

  const playAudio = (songData: Song) => {
    load(getAudioUrl(AUDIO_QUALITY.HIGH, songData.downloadUrl), {
      autoplay: config?.autoplay ?? true,
      ...config,
    });
    dispatch(setNowPlaying(songData));
  };

  return { playAudio };
};
