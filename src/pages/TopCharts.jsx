import React from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading songs top charts.." />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-white text-3xl mt-4 mb-10">Discover Top Charts</h1>

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {data.map((song, i) => (
          <SongCard song={song} data={data} i={i} isPlaying={isPlaying} activeSong={activeSong} />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
