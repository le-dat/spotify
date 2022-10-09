import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[15rem] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0]?.adamid}`)}
    >
      <img src={track?.images?.coverart} alt={track.subtitle} className="w-full object-contain" />
      <p className="text-white text-base font-medium mt-4">{track?.subtitle}</p>
    </div>
  );
};

export default ArtistCard;
