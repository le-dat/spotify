import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayerPause = ({ song, isPlaying, activeSong, handlePauseClick, handlePlayClick, size = 35 }) => {
  return (
    <>
      {isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle size={size} className="text-gray-300" onClick={handlePauseClick} />
      ) : (
        <FaPlayCircle size={size} className="text-gray-300" onClick={handlePlayClick} />
      )}
    </>
  );
};

export default PlayerPause;
