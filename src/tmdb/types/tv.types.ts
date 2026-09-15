export interface TmdbTvGenre {
    id: number;
    name: string;
}

export interface TmdbTv {
    id: number;
    name: string;
    originalName: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    firstAirDate: string | null;
    lastAirDate: string | null;
    numberOfSeasons: number;
    numberOfEpisodes: number;
    status: string;
    tagline: string | null;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genres: TmdbTvGenre[];
    originalLanguage: string;
    episodeRunTime: number[];
}

export interface TmdbSeason {
    id: number;
    name: string;
    overview: string;
    seasonNumber: number;
    episodeCount: number;
    airDate: string | null;
    posterPath: string | null;
}

export interface TmdbEpisode {
    id: number;
    name: string;
    overview: string;
    episodeNumber: number;
    seasonNumber: number;
    airDate: string | null;
    runtime: number | null;
    stillPath: string | null;
    voteAverage: number;
    voteCount: number;
}

export interface TmdbTvList {
    page: number;
    results: TmdbTv[];
    totalPages: number;
    totalResults: number;
}