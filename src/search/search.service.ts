import { Injectable } from '@nestjs/common';

import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class SearchService {
    constructor(
        private readonly tmdbService: TmdbService,
    ) { }

    async search(
        query: string,
        page = 1,
    ) {
        return this.tmdbService.search(
            query,
            page,
        );
    }
}