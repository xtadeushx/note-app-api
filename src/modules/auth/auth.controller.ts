import { Body, Controller, Post } from '@nestjs/common';
import { ApiPath, AuthApiPath } from 'src/common/enums/enums';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { AuthUserResponse } from './response';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthApiPath.REGISTER)
  async register(@Body() dto: CreateUserDto): Promise<AuthUserResponse> {
    return await this.authService.registerUsers(dto);
  }

  @Post(AuthApiPath.LOGIN)
  async login(@Body() dto: LoginUserDto): Promise<AuthUserResponse> {
    return await this.authService.loginUser(dto);
  }
}
