import { Injectable } from '@nestjs/common';
import { Watchlist } from './models/watchlist.model';
import { InjectModel } from '@nestjs/sequelize';
import { WatchListDto } from './dto';
import { CreateAssetResponseDto } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist) readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAssets(user, dto: WatchListDto): Promise<CreateAssetResponseDto> {
    const watchList = { user: user.id, name: dto.name, assetId: dto.assetId };
    await this.watchlistRepository.create(watchList);
    return watchList;
  }

  async deleteAssets(assetId: string, userId: string): Promise<string> {
    await this.watchlistRepository.destroy({
      where: { id: assetId, user: userId },
    });
    return `assets  with user id: ${assetId} was deleted`;
  }
}
