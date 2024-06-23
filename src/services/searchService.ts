// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiResponse,
  SearchResult,
  Album,
  Artist,
  Playlist,
} from "./search.types.ts";
import { SongsApiResponse } from "./searchBySong.types.ts";

// Define a service using a base URL and expected endpoints
export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    // Endpoint for general search
    search: builder.query<ApiResponse<SearchResult>, { searchTerm: string }>({
      query: ({ searchTerm }) => `search?query=${searchTerm}`,
    }),
    // Endpoint for searching songs
    searchSongs: builder.query<SongsApiResponse, { searchTerm: string }>({
      query: ({ searchTerm }) => `search/songs?query=${searchTerm}`,
    }),
    // Endpoint for searching albums
    searchAlbums: builder.query<ApiResponse<Album>[], { searchTerm: string }>({
      query: ({ searchTerm }) => `search/albums?query=${searchTerm}`,
    }),
    // Endpoint for searching artists
    searchArtists: builder.query<ApiResponse<Artist>[], { searchTerm: string }>(
      {
        query: ({ searchTerm }) => `search/artists?query=${searchTerm}`,
      },
    ),
    // Endpoint for searching playlists
    searchPlaylists: builder.query<
      ApiResponse<Playlist>[],
      { searchTerm: string }
    >({
      query: ({ searchTerm }) => `search/playlists?query=${searchTerm}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchQuery,
  useSearchSongsQuery,
  useSearchAlbumsQuery,
  useSearchArtistsQuery,
  useSearchPlaylistsQuery,
} = searchApi;
