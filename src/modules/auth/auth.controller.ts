import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiPath, AuthApiPath, HttpCode } from 'src/common/enums/enums';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @Post(AuthApiPath.REGISTER)
  @ApiResponse({
    status: HttpCode.CREATED,
    type: CreateUserDto,
  })
  async register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return await this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @ApiResponse({
    status: HttpCode.OK,
    type: AuthUserResponse,
  })
  @ApiUnauthorizedResponse({ status: HttpCode.UNAUTHORIZED })
  @Post(AuthApiPath.LOGIN)
  async login(@Body() dto: LoginUserDto): Promise<AuthUserResponse> {
    return await this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
