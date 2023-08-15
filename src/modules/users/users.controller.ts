import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiPath, HttpCode } from 'src/common/enums/enums';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(ApiPath.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({
    status: HttpCode.OK,
    type: UpdateUserDto,
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const { email } = request.user;
    return this.usersService.updateUser(email, updateDto);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Req() request): Promise<string> {
    const { email } = request.user;
    return this.usersService.deleteUser(email);
  }
}
