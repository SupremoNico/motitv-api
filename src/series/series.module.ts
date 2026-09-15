import { Module } from '@nestjs/common';

import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule { }