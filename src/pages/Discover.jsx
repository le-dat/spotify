import React, { useEffect } from "react";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constant";

import { useGetSongByGenresQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongByGenresQuery({ genre: genreListId || "POP" });
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) return <Loader title="Loading songs..." />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="text-white font-bold text-3xl text-left">Discover {genreTitle}</h2>
        <select
          name=""
          value={genreListId || "POP"}
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
            console.log(e.target.value);
          }}
          className="bg-black p-2 outline-none text-white text-left mt-5 md:mt-0 rounded-lg"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-start items-center gap-8">
        {data.map((song, i) => (
          <SongCard key={i} song={song} isPlaying={isPlaying} activeSong={activeSong} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
