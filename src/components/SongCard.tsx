import { useMemo } from "react";
import { IMAGE_QUALITY } from "../services/search.types";
import { getImageUrl, replaceQuotePlaceholders } from "../utils/utils";
import "./SongCard.css";
import { Song } from "../services/searchBySong.types";
import { MoreVertical } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import { selectSettings } from "../features/settings/settingSlice";

type SongCardProps = {
  data: Song;
  type?: "LIST" | "TILE";
  onPress?: () => void;
  onPressMore?: () => void;
  isMoreOptions?: boolean;
};
const SongCard = ({
  data,
  type = "LIST",
  onPress,
  onPressMore,
  isMoreOptions = false,
}: SongCardProps) => {
  const isList = useMemo(() => (type === "LIST" ? true : false), [type]);

  const { isLightTheme } = useAppSelector(selectSettings);

  return (
    <div
      className={`SongCardContainer`}
      style={onPress === undefined ? { cursor: "unset" } : {}}
      role="button"
    >
      <div
        className={`SongCard ${type === "LIST" ? "list" : "tile"}`}
        onClick={onPress}
        role="button"
        style={onPress === undefined ? { cursor: "unset" } : {}}
      >
        <div className="image-container">
          <img
            src={getImageUrl(
              isList ? IMAGE_QUALITY.LOW : IMAGE_QUALITY.MEDIUM,
              data.image,
            )}
          />
        </div>
        <div className="details-container">
          <h4 className="song-title overflow-prevent">
            {replaceQuotePlaceholders(data.name)}
          </h4>
          <p className="regular-text overflow-prevent">
            {data.artists?.primary.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      {isMoreOptions ? (
        <button onClick={onPressMore} className="more-button">
          <MoreVertical size={24} color={isLightTheme ? "black" : "white"} />
        </button>
      ) : null}
    </div>
  );
};

export default SongCard;
