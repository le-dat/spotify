import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayerPause from "./PlayerPause";

const SongCard = ({ song, i, data, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className={`flex flex-col w-[9rem] p-4 bg-white/5 bg-opacity-80 backdrop-blur-none ${
        !song && "animate-pulse"
      } rounded-lg cursor-pointer`}
    >
      <div className="relative w-full group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? "bg-opacity-70" : "hidden"
          }`}
        >
          <PlayerPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>
        <img src={song?.images?.coverart} alt="song_img" className="w-full h-full object-contain" />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </div>
        <div className="text-sm truncate text-gray-300 mt-1 hover:underline">
          <Link to={song.artists ? `artists/${song?.artists[0]?.adamid}` : "top-artists"}>{song?.subtitle}</Link>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
