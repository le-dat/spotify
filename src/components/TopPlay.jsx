import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayerPause from "./PlayerPause";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="flex items-center px-3 py-1 cursor-pointer hover:bg-[#4c426e]">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

    <div className="flex-1 flex items-center gap-2">
      <img src={song?.images?.coverart} alt="image" className="w-10 h-10 object-contain rounded-lg" />
      <div className="flex flex-col">
        <Link to={`/songs/${song.key}`}>
          <h4 className="text-white text-sm">{song?.title}</h4>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <h6 className="text-gray-400 text-xs">{song?.subtitle}</h6>
        </Link>
      </div>
    </div>

    <PlayerPause
      size={25}
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePauseClick={handlePauseClick}
      handlePlayClick={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const topCharts = data?.slice(0, 5);

  if (!topCharts) return <div>"Loading..."</div>;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex-1 max-w-full mb-6 xl:ml-12 xl:w-[24rem]">
      <div className="flex flex-col gap-4">
        <div className="w-full flex justify-between items-center mt-4">
          <h2 className="font-bold text-white text-2xl">Top Chart</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base hover:text-gray-100 cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {topCharts.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-bold text-white text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base hover:text-gray-100 cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topCharts.map((artist) => (
            <SwiperSlide key={artist?.key} style={{ width: "25%", height: "auto" }} className="shadow-lg rounded-full">
              <Link to={`/artists/${artist?.artists[0].adamid}`}>
                <img src={artist?.images?.background} alt="artist" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
