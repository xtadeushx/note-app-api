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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() dto: WatchListDto, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAssets(user, dto);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  getAllAsset(@Query('id') id): Promise<WatchListDto[]> {
    return this.watchlistService.getAllAssets(id);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateAssets(
    @Body() dto: WatchListDto,
    @Query('id') id,
  ): Promise<WatchListDto> {
    return this.watchlistService.updateAssets(dto, id);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAsset(@Query('id') id): Promise<string> {
    return this.watchlistService.deleteAssets(id);
  }
}
