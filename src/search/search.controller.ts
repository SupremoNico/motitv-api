import {
    BadRequestException,
    Controller,
    Get,
    Query,
} from '@nestjs/common';

import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
    ) { }

    @Get()
    search(
        @Query('query') query?: string,
        @Query('page') page?: string,
    ) {
        if (!query?.trim()) {
            throw new BadRequestException(
                'Query is required',
            );
        }

        return this.searchService.search(
            query,
            this.parsePage(page),
        );
    }

    private parsePage(page?: string): number {
        const parsed = Number(page ?? 1);

        if (!Number.isInteger(parsed) || parsed < 1) {
            return 1;
        }

        return parsed;
    }
}