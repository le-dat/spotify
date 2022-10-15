import React from "react";
import { useParams } from "react-router-dom";
import { useGetSongBySearchQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongBar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongBySearchQuery({ searchTerm });
  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (isFetching) return <Loader title={`Searching ${searchTerm} ...`} />;
  if (isError) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-white text-lg text-left mt-1 mb-5">Result for: {searchTerm}</h1>

      <div className="flex flex-col justify-center gap-3">
        {songs.map((song, i) => (
          <SongBar
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            active={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
