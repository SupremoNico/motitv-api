import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import type {
  TmdbApiCredits,
  TmdbApiEpisode,
  TmdbApiMovie,
  TmdbApiMovieList,
  TmdbApiSeason,
  TmdbApiSearchResponse,
  TmdbApiTv,
  TmdbApiTvList,
  TmdbApiVideos,
} from './types/tmdb-api.types';

import type {
  TmdbMovie,
  TmdbMovieCredits,
  TmdbMovieList,
  TmdbVideos,
} from './types/movie.types';

import type {
  TmdbEpisode,
  TmdbSeason,
  TmdbTv,
  TmdbTvList,
} from './types/tv.types';

import type {
  TmdbSearchResponse,
} from './types/search.types';

import { getTmdbImageUrl } from './tmdb-image';

@Injectable()
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(
    private readonly configService: ConfigService,
  ) { }

  // -----------------------------------------
  // Movies
  // -----------------------------------------

  async getMovie(id: number): Promise<TmdbMovie> {
    const movie =
      await this.request<TmdbApiMovie>(
        `/movie/${id}?language=en-US`,
      );

    return this.mapMovie(movie);
  }

  async getMovieCredits(
    id: number,
  ): Promise<TmdbMovieCredits> {
    const credits =
      await this.request<TmdbApiCredits>(
        `/movie/${id}/credits?language=en-US`,
      );

    return this.mapCredits(credits);
  }

  async getMovieVideos(
    id: number,
  ): Promise<TmdbVideos> {
    const videos =
      await this.request<TmdbApiVideos>(
        `/movie/${id}/videos?language=en-US`,
      );

    return this.mapVideos(videos);
  }

  async getMovieRecommendations(
    id: number,
    page = 1,
  ): Promise<TmdbMovieList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiMovieList>(
        `/movie/${id}/recommendations?${params.toString()}`,
      );

    return this.mapMovieList(response);
  }

  async getPopularMovies(
    page = 1,
  ): Promise<TmdbMovieList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiMovieList>(
        `/movie/popular?${params.toString()}`,
      );

    return this.mapMovieList(response);
  }

  async getNowPlayingMovies(
    page = 1,
  ): Promise<TmdbMovieList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiMovieList>(
        `/movie/now_playing?${params.toString()}`,
      );

    return this.mapMovieList(response);
  }

  async getUpcomingMovies(
    page = 1,
  ): Promise<TmdbMovieList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiMovieList>(
        `/movie/upcoming?${params.toString()}`,
      );

    return this.mapMovieList(response);
  }

  async getTopRatedMovies(
    page = 1,
  ): Promise<TmdbMovieList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiMovieList>(
        `/movie/top_rated?${params.toString()}`,
      );

    return this.mapMovieList(response);
  }

  // -----------------------------------------
  // TV / Series
  // -----------------------------------------

  async getTv(id: number): Promise<TmdbTv> {
    const tv =
      await this.request<TmdbApiTv>(
        `/tv/${id}?language=en-US`,
      );

    return this.mapTv(tv);
  }

  async getTvCredits(
    id: number,
  ): Promise<TmdbMovieCredits> {
    const credits =
      await this.request<TmdbApiCredits>(
        `/tv/${id}/credits?language=en-US`,
      );

    return this.mapCredits(credits);
  }

  async getTvVideos(
    id: number,
  ): Promise<TmdbVideos> {
    const videos =
      await this.request<TmdbApiVideos>(
        `/tv/${id}/videos?language=en-US`,
      );

    return this.mapVideos(videos);
  }

  async getTvRecommendations(
    id: number,
    page = 1,
  ): Promise<TmdbTvList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiTvList>(
        `/tv/${id}/recommendations?${params.toString()}`,
      );

    return this.mapTvList(response);
  }

  async getPopularTv(
    page = 1,
  ): Promise<TmdbTvList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiTvList>(
        `/tv/popular?${params.toString()}`,
      );

    return this.mapTvList(response);
  }

  async getTopRatedTv(
    page = 1,
  ): Promise<TmdbTvList> {
    const params = new URLSearchParams({
      language: 'en-US',
      page: String(page),
    });

    const response =
      await this.request<TmdbApiTvList>(
        `/tv/top_rated?${params.toString()}`,
      );

    return this.mapTvList(response);
  }

  async getTvSeason(
    tvId: number,
    seasonNumber: number,
  ): Promise<TmdbSeason> {
    const season =
      await this.request<TmdbApiSeason>(
        `/tv/${tvId}/season/${seasonNumber}?language=en-US`,
      );

    return this.mapSeason(season);
  }

  async getTvEpisode(
    tvId: number,
    seasonNumber: number,
    episodeNumber: number,
  ): Promise<TmdbEpisode> {
    const episode =
      await this.request<TmdbApiEpisode>(
        `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`,
      );

    return this.mapEpisode(episode);
  }

  // -----------------------------------------
  // Search
  // -----------------------------------------

  async search(
    query: string,
    page = 1,
  ): Promise<TmdbSearchResponse> {
    const params = new URLSearchParams({
      query: query.trim(),
      page: String(page),
      language: 'en-US',
      include_adult: 'false',
    });

    const response =
      await this.request<TmdbApiSearchResponse>(
        `/search/multi?${params.toString()}`,
      );

    return this.mapSearch(response);
  }

  // -----------------------------------------
  // Trending
  // -----------------------------------------

  async getTrending(
    type: 'movie' | 'tv' = 'movie',
    timeWindow: 'day' | 'week' = 'week',
  ): Promise<TmdbMovieList | TmdbTvList> {
    if (type === 'movie') {
      const response =
        await this.request<TmdbApiMovieList>(
          `/trending/movie/${timeWindow}`,
        );

      return this.mapMovieList(response);
    }

    const response =
      await this.request<TmdbApiTvList>(
        `/trending/tv/${timeWindow}`,
      );

    return this.mapTvList(response);
  }

  // -----------------------------------------
  // HTTP
  // -----------------------------------------

  private async request<T>(
    endpoint: string,
  ): Promise<T> {
    const accessToken =
      this.configService.get<string>(
        'TMDB_ACCESS_TOKEN',
      );

    if (!accessToken) {
      throw new InternalServerErrorException(
        'TMDB_ACCESS_TOKEN is not configured',
      );
    }

    try {
      const response = await fetch(
        `${this.baseUrl}${endpoint}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.status === 404) {
        throw new NotFoundException(
          'TMDB resource not found',
        );
      }

      if (!response.ok) {
        throw new ServiceUnavailableException(
          `TMDB request failed with status ${response.status}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ServiceUnavailableException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new ServiceUnavailableException(
        'Unable to connect to TMDB',
      );
    }
  }

  // -----------------------------------------
  // Mappers
  // -----------------------------------------

  private mapMovie(
    movie: TmdbApiMovie,
  ): TmdbMovie {
    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      posterUrl: getTmdbImageUrl(
        movie.poster_path,
        'w500',
      ),
      backdropPath: movie.backdrop_path,
      backdropUrl: getTmdbImageUrl(
        movie.backdrop_path,
        'w1280',
      ),
      releaseDate: movie.release_date || null,
      runtime: movie.runtime,
      status: movie.status,
      tagline: movie.tagline,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      genres: movie.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      })),
      originalLanguage: movie.original_language,
      adult: movie.adult,
    };
  }

  private mapMovieList(
    response: TmdbApiMovieList,
  ): TmdbMovieList {
    return {
      page: response.page,
      results: response.results.map(
        (movie) => this.mapMovie(movie),
      ),
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };
  }

  private mapTv(
    tv: TmdbApiTv,
  ): TmdbTv {
    return {
      id: tv.id,
      name: tv.name,
      originalName: tv.original_name,
      overview: tv.overview,
      posterPath: tv.poster_path,
      posterUrl: getTmdbImageUrl(
        tv.poster_path,
        'w500',
      ),
      backdropPath: tv.backdrop_path,
      backdropUrl: getTmdbImageUrl(
        tv.backdrop_path,
        'w1280',
      ),
      firstAirDate: tv.first_air_date || null,
      lastAirDate: tv.last_air_date || null,
      numberOfSeasons: tv.number_of_seasons,
      numberOfEpisodes: tv.number_of_episodes,
      status: tv.status,
      tagline: tv.tagline,
      voteAverage: tv.vote_average,
      voteCount: tv.vote_count,
      popularity: tv.popularity,
      genres: tv.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      })),
      originalLanguage: tv.original_language,
      episodeRunTime: tv.episode_run_time,
    };
  }

  private mapTvList(
    response: TmdbApiTvList,
  ): TmdbTvList {
    return {
      page: response.page,
      results: response.results.map(
        (tv) => this.mapTv(tv),
      ),
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };
  }

  private mapCredits(
    credits: TmdbApiCredits,
  ): TmdbMovieCredits {
    return {
      cast: credits.cast.map((person) => ({
        id: person.id,
        name: person.name,
        character: person.character,
        profilePath: person.profile_path,
      })),
      crew: credits.crew.map((person) => ({
        id: person.id,
        name: person.name,
        job: person.job,
        department: person.department,
        profilePath: person.profile_path,
      })),
    };
  }

  private mapVideos(
    videos: TmdbApiVideos,
  ): TmdbVideos {
    return {
      results: videos.results.map((video) => ({
        id: video.id,
        key: video.key,
        name: video.name,
        site: video.site,
        type: video.type,
        official: video.official,
      })),
    };
  }

  private mapSeason(
    season: TmdbApiSeason,
  ): TmdbSeason {
    return {
      id: season.id,
      name: season.name,
      overview: season.overview,
      seasonNumber:
        season.season_number,
      episodeCount:
        season.episode_count,
      airDate: season.air_date,
      posterPath:
        season.poster_path,
    };
  }

  private mapEpisode(
    episode: TmdbApiEpisode,
  ): TmdbEpisode {
    return {
      id: episode.id,
      name: episode.name,
      overview: episode.overview,
      episodeNumber:
        episode.episode_number,
      seasonNumber:
        episode.season_number,
      airDate: episode.air_date,
      runtime: episode.runtime,
      stillPath:
        episode.still_path,
      voteAverage:
        episode.vote_average,
      voteCount:
        episode.vote_count,
    };
  }

  private mapSearch(
    response: TmdbApiSearchResponse,
  ): TmdbSearchResponse {
    return {
      page: response.page,
      results: response.results.map(
        (result) => {
          if (
            result.media_type ===
            'movie'
          ) {
            return {
              id: result.id,
              mediaType: 'movie',
              title: result.title,
              originalTitle:
                result.original_title,
              overview:
                result.overview,
              posterPath:
                result.poster_path,
              posterUrl:
                getTmdbImageUrl(
                  result.poster_path,
                  'w500',
                ),
              backdropPath:
                result.backdrop_path,
              backdropUrl:
                getTmdbImageUrl(
                  result.backdrop_path,
                  'w1280',
                ),
              releaseDate:
                result.release_date,
              voteAverage:
                result.vote_average,
            };
          }

          if (
            result.media_type ===
            'tv'
          ) {
            return {
              id: result.id,
              mediaType: 'tv',
              name: result.name,
              originalName:
                result.original_name,
              overview:
                result.overview,
              posterPath:
                result.poster_path,
              posterUrl:
                getTmdbImageUrl(
                  result.poster_path,
                  'w500',
                ),
              backdropPath:
                result.backdrop_path,
              backdropUrl:
                getTmdbImageUrl(
                  result.backdrop_path,
                  'w1280',
                ),
              firstAirDate:
                result.first_air_date,
              voteAverage:
                result.vote_average,
            };
          }

          return {
            id: result.id,
            mediaType: 'person',
            name: result.name,
            profilePath:
              result.profile_path,
            knownForDepartment:
              result.known_for_department,
          };
        },
      ),
      totalPages:
        response.total_pages,
      totalResults:
        response.total_results,
    };
  }
}