import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongByCountryQuery({ countryCode: country });

  useEffect(() => {
    axios
      .get(`https://api.ipgeolocation.io/ipgeo?apiKey=774f18889e4a4a759c0db7fe884b4056`)
      .then(({ data }) => {
        setCountry(data?.country_code2);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you..." />;
  if (isError && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-white text-3xl mt-4 mb-10">Around you - {country}</h1>

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {data?.length > 0 &&
          data.map((song, i) => (
            <SongCard song={song} data={data} i={i} isPlaying={isPlaying} activeSong={activeSong} />
          ))}
      </div>
    </div>
  );
};

export default AroundYou;
