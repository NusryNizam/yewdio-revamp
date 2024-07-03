import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import { selectNowPlaying } from "../features/playlists/playlistSlice";
import { IMAGE_QUALITY } from "../services/search.types";
import { getImageUrl, replaceQuotePlaceholders } from "../utils/utils";
import "./NowPlaying.css";

type NowPlayingProps = {
  className?: string;
};

const NowPlaying = ({ className = "" }: NowPlayingProps) => {
  const nowPlaying = useAppSelector(selectNowPlaying);

  const imageUrl = useMemo(
    () => getImageUrl(IMAGE_QUALITY.HIGH, nowPlaying?.image ?? []) ?? "",
    [nowPlaying?.image],
  );

  const artists = useMemo(
    () => nowPlaying?.artists.primary.map((e) => e.name).join(", "),
    [nowPlaying?.artists.primary],
  );

  return (
    <div
      className={`NowPlaying ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        ...(!nowPlaying ? { display: "none" } : {}),
      }}
    >
      <div className="container">
        <h4>{replaceQuotePlaceholders(nowPlaying?.name ?? "")}</h4>
        <p className="text-light-artist">{artists}</p>
      </div>
    </div>
  );
};

export default NowPlaying;
