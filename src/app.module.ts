import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthController } from './health/health.controller';
import { TmdbModule } from './tmdb/tmdb.module';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TmdbModule,
    MoviesModule,
    SeriesModule,
    SearchModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
