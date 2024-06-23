import { ChangeEvent, useState } from "react";
import "./Search.css";
import { useSearchSongsQuery } from "../services/searchService";
import { useDebouncedCallback } from "use-debounce";
import SongCard from "../components/SongCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Song } from "../services/searchBySong.types";
import {
  openSheet,
  selectSettings,
  setSearchTerm,
  setSheetData,
} from "../features/settings/settingSlice";
import { usePlayer } from "../hooks/usePlayer";
import { LoaderCircle, XIcon } from "lucide-react";

const Search = () => {
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const { searchTerm, isLightTheme } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const { playAudio } = usePlayer();

  const { data, error, isLoading } = useSearchSongsQuery(
    { searchTerm },
    { skip: !searchTerm },
  );

  const handleChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTermLocal(e.target.value);
      dispatch(setSearchTerm(e.target.value));
    },
    1500,
  );

  const handleMoreOptions = (data: Song) => {
    dispatch(openSheet());
    dispatch(setSheetData(data));
  };

  return (
    <div className="Search">
      <header className="search-header">
        <h2 className="title">Search</h2>
        <div className="searchbox-container">
          <input
            type="search"
            placeholder="Search for songs"
            className="searchbox"
            onChange={(e) => {
              setSearchTermLocal(e.target.value);
              handleChange(e);
            }}
            disabled={isLoading}
            value={searchTermLocal}
          />

          {isLoading ? (
            <button
              className="close-button clear-search loader"
              disabled={true}
            >
              <LoaderCircle color={isLightTheme ? "black" : "white"} />
            </button>
          ) : searchTerm && searchTermLocal ? (
            <button
              className="close-button clear-search"
              onClick={() => {
                dispatch(setSearchTerm(""));
                setSearchTermLocal("");
              }}
            >
              <XIcon color={isLightTheme ? "black" : "white"} />
            </button>
          ) : null}
        </div>
      </header>

      {data ? (
        <div className="search-container">
          <p className="regular-medium-text">Songs</p>

          <div className="songs-container">
            {data.data.results.map((song) => (
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
      ) : null}

      {isLoading ? (
        <div className="loading-indicator">
          <LoaderCircle
            color={isLightTheme ? "black" : "white"}
            className="loader"
          />
        </div>
      ) : null}

      {error ? <p>Couldn't find results</p> : null}
    </div>
  );
};

export default Search;
