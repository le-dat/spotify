import React from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId].attributes;

  return (
    <div className="w-full relative flex flex-col">
      <div className=" h-20 sm:h-32 bg-gradient-to-r from-black to-transparent">
        <div className="absolute inset-0 flex items-center gap-3">
          <img
            alt="profile"
            src={
              artistId ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "500") : songData?.images?.coverart
            }
            className="w-20 h-20 rounded-full object-contain border-2 shadow-xl shadow-black"
          />

          <div className="flex flex-col gap-1">
            <p className="text-white font-bold sm:text-3xl text-xl">{artistId ? artist?.name : songData?.title}</p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0]?.adamid}`} className="text-gray-400 font-bold text-base">
                {songData?.subtitle}
              </Link>
            )}

            <p className="text-base text-gray-400">{artistId ? artist?.genreNames[0] : songData?.genres?.primary}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-24" />
    </div>
  );
};

export default DetailsHeader;
