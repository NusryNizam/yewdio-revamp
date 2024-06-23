interface Lyrics {
  lyrics: string;
  copyright: string;
  snippet: string;
}

interface Album {
  id: string | null;
  name: string | null;
  url: string | null;
}

interface Artists {
  primary: Artist[];
  featured: Artist[];
  all: Artist[];
}

interface Artist {
  id: string;
  name: string;
  image: Image[];
  url: string;
}

export interface Image {
  quality: string | null;
  url: string | null;
}

export interface DownloadUrl {
  quality: string | null;
  url: string | null;
}

export interface Song {
  id: string;
  name: string;
  type: string;
  year: string | null;
  releaseDate: string | null;
  duration: number | null;
  label: string | null;
  explicitContent: boolean;
  playCount: number | null;
  language: string;
  hasLyrics: boolean;
  lyricsId: string | null;
  lyrics: Lyrics | null;
  url: string;
  copyright: string | null;
  album: Album;
  artists: Artists;
  image: Image[];
  downloadUrl: DownloadUrl[];
}

interface SongsData {
  total: number;
  start: number;
  results: Song[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type SongsApiResponse = ApiResponse<SongsData>;
