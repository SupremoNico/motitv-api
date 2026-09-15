import { Injectable } from '@nestjs/common';

import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class MoviesService {
    constructor(
        private readonly tmdbService: TmdbService,
    ) { }

    async getMovie(id: number) {
        return this.tmdbService.getMovie(id);
    }

    async getCredits(id: number) {
        return this.tmdbService.getMovieCredits(id);
    }

    async getVideos(id: number) {
        return this.tmdbService.getMovieVideos(id);
    }

    async getRecommendations(
        id: number,
        page = 1,
    ) {
        return this.tmdbService.getMovieRecommendations(
            id,
            page,
        );
    }

    async getPopular(page = 1) {
        return this.tmdbService.getPopularMovies(page);
    }

    async getNowPlaying(page = 1) {
        return this.tmdbService.getNowPlayingMovies(
            page,
        );
    }

    async getUpcoming(page = 1) {
        return this.tmdbService.getUpcomingMovies(
            page,
        );
    }

    async getTopRated(page = 1) {
        return this.tmdbService.getTopRatedMovies(
            page,
        );
    }
}