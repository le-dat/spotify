import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "5ec80d895dmshf422cc6e9ef7ed3p1d0e40jsn5bd4bea775f8");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/world" }),
    getSongDetails: builder.query({ query: ({ songId }) => `/tracks/details?track_id=${songId}` }),
    getSongRelated: builder.query({ query: ({ songId }) => `/tracks/related?track_id=${songId}` }),
    getArtistDetails: builder.query({ query: ({ artistId }) => `/artists/details?artist_id=${artistId}` }),
    getSongByCountry: builder.query({ query: ({ countryCode }) => `/charts/country?country_code=${countryCode}` }),
    getSongBySearch: builder.query({
      query: ({ searchTerm }) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getSongByGenres: builder.query({ query: ({ genre }) => `/charts/genre-world?genre_code=${genre}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongBySearchQuery,
  useGetSongByGenresQuery,
} = shazamCoreApi;
