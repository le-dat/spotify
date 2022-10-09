import React from "react";
import SongBar from "./SongBar";

const RelatedSongs = ({ relateData = [], isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl text-white">Related Songs: </h1>
      <div className="mt-6 w-full flex flex-col gap-2">
        {relateData.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            i={i}
            song={song}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
