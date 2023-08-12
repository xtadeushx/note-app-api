import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ExceptionMessage } from 'src/common/enums/enums';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser)
      throw new BadRequestException(ExceptionMessage.EMAIL_ALREADY_EXISTS);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDto): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser)
      throw new BadRequestException(ExceptionMessage.USERNAME_NOT_REGISTER);
    const validPassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validPassword)
      throw new BadRequestException(ExceptionMessage.PASSWORDS_NOT_MATCH);
    const token = await this.tokenService.generateJwtToken(dto.email);
    return { ...existUser, token };
  }
}
