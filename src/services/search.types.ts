export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export enum IMAGE_QUALITY {
  LOW = "50x50",
  MEDIUM = "150x150",
  HIGH = "500x500",
}

export enum AUDIO_QUALITY {
  LOW = "96kbps",
  MEDIUM = "160kbps",
  HIGH = "320kbps",
}

export type Image = {
  quality: IMAGE_QUALITY;
  url: string | null;
};

export type Album = {
  id: string;
  title: string;
  image: Image[];
  artist: string;
  url: string;
  type: string;
  description: string;
  year: string;
  language: string;
  songIds: string;
};

export type Song = {
  id: string;
  title: string;
  image: Image[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
};

export type Artist = {
  id: string;
  title: string;
  image: Image[];
  type: string;
  description: string;
  position: number;
};

export type Playlist = {
  id: string;
  title: string;
  image: Image[];
  url: string;
  language: string;
  type: string;
  description: string;
};

export type TopQuery = {
  id: string;
  title: string;
  image: Image[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
};

export type SearchResult = {
  albums: {
    results: Album[];
    position: number;
  };
  songs: {
    results: Song[];
    position: number;
  };
  artists: {
    results: Artist[];
    position: number;
  };
  playlists: {
    results: Playlist[];
    position: number;
  };
  topQuery: {
    results: TopQuery[];
    position: number;
  };
};
