export interface TmdbSearchMovie {
    id: number;
    mediaType: 'movie';
    title: string;
    originalTitle: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string | null;
    voteAverage: number;
}

export interface TmdbSearchTv {
    id: number;
    mediaType: 'tv';
    name: string;
    originalName: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    firstAirDate: string | null;
    voteAverage: number;
}

export interface TmdbSearchPerson {
    id: number;
    mediaType: 'person';
    name: string;
    profilePath: string | null;
    knownForDepartment: string | null;
}

export type TmdbSearchResult =
    | TmdbSearchMovie
    | TmdbSearchTv
    | TmdbSearchPerson;

export interface TmdbSearchResponse {
    page: number;
    results: TmdbSearchResult[];
    totalPages: number;
    totalResults: number;
}