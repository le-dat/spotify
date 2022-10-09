import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistData, isError } = useGetArtistDetailsQuery({ artistId });

  if (isFetchingArtistData) return <Loader title="Loading artist details..." />;
  if (isError) return <Error />;

  console.log(artistData);

  return (
    <div className="flex flex-col gap-4">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        relateData={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
