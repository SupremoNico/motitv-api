export interface TmdbGenre {
    id: number;
    name: string;
}

export interface TmdbMovie {
    id: number;
    title: string;
    originalTitle: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string | null;
    runtime: number | null;
    status: string;
    tagline: string | null;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genres: TmdbGenre[];
    originalLanguage: string;
    adult: boolean;
}

export interface TmdbMovieCredit {
    id: number;
    name: string;
    character?: string;
    job?: string;
    department?: string;
    profilePath: string | null;
}

export interface TmdbMovieCredits {
    cast: TmdbMovieCredit[];
    crew: TmdbMovieCredit[];
}

export interface TmdbVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
}

export interface TmdbVideos {
    results: TmdbVideo[];
}

export interface TmdbMovieList {
    page: number;
    results: TmdbMovie[];
    totalPages: number;
    totalResults: number;
}