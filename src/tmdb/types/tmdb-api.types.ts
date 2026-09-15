export interface TmdbApiGenre {
    id: number;
    name: string;
}

export interface TmdbApiMovie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    runtime: number | null;
    status: string;
    tagline: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: TmdbApiGenre[];
    original_language: string;
    adult: boolean;
}

export interface TmdbApiTv {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    last_air_date: string | null;
    number_of_seasons: number;
    number_of_episodes: number;
    status: string;
    tagline: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: TmdbApiGenre[];
    original_language: string;
    episode_run_time: number[];
}

export interface TmdbApiMovieList {
    page: number;
    results: TmdbApiMovie[];
    total_pages: number;
    total_results: number;
}

export interface TmdbApiTvList {
    page: number;
    results: TmdbApiTv[];
    total_pages: number;
    total_results: number;
}

export interface TmdbApiCredit {
    id: number;
    name: string;
    character?: string;
    job?: string;
    department?: string;
    profile_path: string | null;
}

export interface TmdbApiCredits {
    cast: TmdbApiCredit[];
    crew: TmdbApiCredit[];
}

export interface TmdbApiVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
}

export interface TmdbApiVideos {
    results: TmdbApiVideo[];
}

export interface TmdbApiSeason {
    id: number;
    name: string;
    overview: string;
    season_number: number;
    episode_count: number;
    air_date: string | null;
    poster_path: string | null;
    episodes: TmdbApiEpisode[];
}

export interface TmdbApiEpisode {
    id: number;
    name: string;
    overview: string;
    episode_number: number;
    season_number: number;
    air_date: string | null;
    runtime: number | null;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
}

export interface TmdbApiSearchMovie {
    id: number;
    media_type: 'movie';
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string | null;
    vote_average: number;
}

export interface TmdbApiSearchTv {
    id: number;
    media_type: 'tv';
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string | null;
    vote_average: number;
}

export interface TmdbApiSearchPerson {
    id: number;
    media_type: 'person';
    name: string;
    profile_path: string | null;
    known_for_department: string | null;
}

export type TmdbApiSearchResult =
    | TmdbApiSearchMovie
    | TmdbApiSearchTv
    | TmdbApiSearchPerson;

export interface TmdbApiSearchResponse {
    page: number;
    results: TmdbApiSearchResult[];
    total_pages: number;
    total_results: number;
}