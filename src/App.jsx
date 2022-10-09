import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { SearchBar, Sidebar, MusicPlayer, TopPlay } from "./components";
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from "./pages";

const App = () => {
  const divRef = useRef(null);
  const { activeSong } = useSelector((state) => state.player);

  useEffect(() => {
    // if (divRef.current) divRef.current.scrollIntoView({ behavior: "smooth" });
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div ref={divRef} className="relative flex h-[100vh]">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        {/* <SearchBar /> */}

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
          <div className="flex-1 h-fit pb-10">
            <SearchBar />

            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songId" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
