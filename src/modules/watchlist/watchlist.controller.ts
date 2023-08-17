import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetResponseDto } from './response';
import { HttpCode } from 'src/common/enums/enums';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    status: HttpCode.CREATED,
    type: CreateAssetResponseDto,
  })
  createAsset(
    @Body() dto: WatchListDto,
    @Req() request,
  ): Promise<CreateAssetResponseDto> {
    const user = request.user;
    return this.watchlistService.createAssets(user, dto);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiResponse({
    status: HttpCode.OK,
  })
  async deleteAsset(
    @Req() request,
    @Query('id') assetId: string,
  ): Promise<string> {
    const { id } = request.user;
    return this.watchlistService.deleteAssets(assetId, id);
  }
}
