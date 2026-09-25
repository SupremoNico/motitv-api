import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';

import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
    constructor(
        private readonly seriesService: SeriesService,
    ) { }

    @Get()
    getSeries(
        @Query('page') page?: string,
        @Query('genre') genre?: string,
    ) {
        return this.seriesService.getSeries(
            this.parsePage(page),
            this.parseGenre(genre),
        );
    }

    @Get('genres')
    getGenres() {
        return this.seriesService.getGenres();
    }

    @Get('popular')
    getPopular(@Query('page') page?: string) {
        return this.seriesService.getPopular(
            this.parsePage(page),
        );
    }

    @Get('top-rated')
    getTopRated(@Query('page') page?: string) {
        return this.seriesService.getTopRated(
            this.parsePage(page),
        );
    }

    @Get(':id/credits')
    getCredits(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.seriesService.getCredits(id);
    }

    @Get(':id/videos')
    getVideos(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.seriesService.getVideos(id);
    }

    @Get(':id/recommendations')
    getRecommendations(
        @Param('id', ParseIntPipe) id: number,
        @Query('page') page?: string,
    ) {
        return this.seriesService.getRecommendations(
            id,
            this.parsePage(page),
        );
    }

    @Get(':id/season/:season/episode/:episode')
    getEpisode(
        @Param('id', ParseIntPipe) id: number,
        @Param('season', ParseIntPipe) season: number,
        @Param('episode', ParseIntPipe) episode: number,
    ) {
        return this.seriesService.getEpisode(
            id,
            season,
            episode,
        );
    }

    @Get(':id/season/:season')
    getSeason(
        @Param('id', ParseIntPipe) id: number,
        @Param('season', ParseIntPipe) season: number,
    ) {
        return this.seriesService.getSeason(
            id,
            season,
        );
    }

    @Get(':id')
    getSeriesById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.seriesService.getSeriesById(id);
    }

    private parsePage(page?: string): number {
        const parsed = Number(page ?? 1);

        if (!Number.isInteger(parsed) || parsed < 1) {
            return 1;
        }

        return parsed;
    }

    private parseGenre(
        genre?: string,
    ): number | undefined {
        if (!genre) {
            return undefined;
        }

        const parsed = Number(genre);

        if (!Number.isInteger(parsed) || parsed < 1) {
            return undefined;
        }

        return parsed;
    }
}