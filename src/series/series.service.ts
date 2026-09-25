import { Injectable } from '@nestjs/common';

import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class SeriesService {
    constructor(
        private readonly tmdbService: TmdbService,
    ) { }

    async getSeries(
        page = 1,
        genreId?: number,
    ) {
        return this.tmdbService.getTvList(
            page,
            genreId,
        );
    }

    async getGenres() {
        return this.tmdbService.getTvGenres();
    }

    async getSeriesById(id: number) {
        return this.tmdbService.getTv(id);
    }

    async getCredits(id: number) {
        return this.tmdbService.getTvCredits(id);
    }

    async getVideos(id: number) {
        return this.tmdbService.getTvVideos(id);
    }

    async getRecommendations(
        id: number,
        page = 1,
    ) {
        return this.tmdbService.getTvRecommendations(
            id,
            page,
        );
    }

    async getPopular(page = 1) {
        return this.tmdbService.getPopularTv(
            page,
        );
    }

    async getTopRated(page = 1) {
        return this.tmdbService.getTopRatedTv(
            page,
        );
    }

    async getSeason(
        id: number,
        season: number,
    ) {
        return this.tmdbService.getTvSeason(
            id,
            season,
        );
    }

    async getEpisode(
        id: number,
        season: number,
        episode: number,
    ) {
        return this.tmdbService.getTvEpisode(
            id,
            season,
            episode,
        );
    }
}