import { Injectable } from '@nestjs/common';
import { Watchlist } from './models/watchlist.model';
import { InjectModel } from '@nestjs/sequelize';
import { WatchListDto } from './dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist) readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAssets(user, dto: WatchListDto) {
    const watchList = { user: user.id, name: dto.name, assetId: dto.assetId };
    await this.watchlistRepository.create(watchList);
    return watchList;
  }

  async getAllAssets(id: string): Promise<Watchlist[]> {
    return await this.watchlistRepository.findAll({ where: { id: id } });
  }

  async updateAssets(dto: WatchListDto, id: string): Promise<WatchListDto> {
    await this.watchlistRepository.update(dto, { where: { id: id } });
    return dto;
  }

  async deleteAssets(id: string): Promise<string> {
    await this.watchlistRepository.destroy({ where: { id } });
    return `user with email  ${id} was deleted`;
  }
}
