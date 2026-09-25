import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';

import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly moviesService: MoviesService,
    ) { }

    @Get()
    getMovies(
        @Query('page') page?: string,
        @Query('genre') genre?: string,
    ) {
        return this.moviesService.getMovies(
            this.parsePage(page),
            this.parseGenre(genre),
        );
    }

    @Get('genres')
    getGenres() {
        return this.moviesService.getGenres();
    }

    @Get('popular')
    getPopular(@Query('page') page?: string) {
        return this.moviesService.getPopular(
            this.parsePage(page),
        );
    }

    @Get('now-playing')
    getNowPlaying(@Query('page') page?: string) {
        return this.moviesService.getNowPlaying(
            this.parsePage(page),
        );
    }

    @Get('upcoming')
    getUpcoming(@Query('page') page?: string) {
        return this.moviesService.getUpcoming(
            this.parsePage(page),
        );
    }

    @Get('top-rated')
    getTopRated(@Query('page') page?: string) {
        return this.moviesService.getTopRated(
            this.parsePage(page),
        );
    }

    @Get(':id/credits')
    getCredits(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.moviesService.getCredits(id);
    }

    @Get(':id/videos')
    getVideos(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.moviesService.getVideos(id);
    }

    @Get(':id/recommendations')
    getRecommendations(
        @Param('id', ParseIntPipe) id: number,
        @Query('page') page?: string,
    ) {
        return this.moviesService.getRecommendations(
            id,
            this.parsePage(page),
        );
    }

    @Get(':id')
    getMovie(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.moviesService.getMovie(id);
    }

    private parsePage(page?: string): number {
        const parsed = Number(page ?? 1);

        if (!Number.isInteger(parsed) || parsed < 1) {
            return 1;
        }

        return parsed;
    }

    private parseGenre(genre?: string): number | undefined {
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