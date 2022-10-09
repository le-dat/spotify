import React from "react";
import { useSelector } from "react-redux";

import { ArtistCard, Error, Loader } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading artists..." />;
  if (isError) return <Error />;

  console.log(data);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-white text-3xl mt-4 mb-10">Top Artists</h1>

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {data.map((track, i) => (
          <ArtistCard key={track?.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
