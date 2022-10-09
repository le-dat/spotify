import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongData } = useGetSongDetailsQuery({ songId });
  const { data: relateData, isFetching: isFetchingRelateData, isError } = useGetSongRelatedQuery({ songId });

  if (isFetchingSongData || isFetchingRelateData) return <Loader title="Loading song details..." />;
  if (isError) return <Error />;

  console.log(relateData);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: songData, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col gap-4">
      <DetailsHeader artistId={artistId} songData={songData} />

      <h3 className="text-white text-lg font-bold">Lyrics: </h3>
      <div className="flex flex-col gap-2 text-gray-400 text-base">
        {songData?.sections[1]?.type === "LYRICS" ? (
          songData?.sections[1]?.text.map((line, i) => <p key={`lyrics-${line}-${i}`}>{line}</p>)
        ) : (
          <p>Sorry, no lyric found !</p>
        )}
      </div>

      <RelatedSongs
        relateData={relateData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
