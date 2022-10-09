import React from "react";
import { Link } from "react-router-dom";
import PlayerPause from "./PlayerPause";

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="flex items-center px-3 py-1 cursor-pointer hover:bg-[#4c426e]">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

    <div className="flex-1 flex items-center gap-2">
      <img
        src={
          artistId ? song?.attributes?.artwork?.url.replace("{w}", "125").replace("{h}", "125") : song?.images?.coverart
        }
        alt={song?.title}
        className="w-10 h-10 object-contain rounded-lg"
      />
      <div className="flex flex-col gap-1">
        {!artistId ? (
          <Link to={`/songs/${song.key}`}>
            <h4 className="text-white text-base">{song?.title}</h4>
          </Link>
        ) : (
          <p className="text-gray-400 text-base">{song?.attributes?.name}</p>
        )}
        <p className="text-xs text-gray-300">{artistId ? song?.attributes?.albumName : song?.subtitle}</p>
      </div>
    </div>

    {!artistId && (
      <PlayerPause
        size={25}
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    )}
  </div>
);

export default SongBar;
