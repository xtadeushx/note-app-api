import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';

@Module({
  imports: [SequelizeModule.forFeature([Watchlist])],
  providers: [WatchlistService],
  controllers: [WatchlistController],
})
export class WatchlistModule {}
