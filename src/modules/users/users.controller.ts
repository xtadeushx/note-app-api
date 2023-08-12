import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { ApiPath, UsersApiPath } from 'src/common/enums/enums';

@Controller(ApiPath.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(UsersApiPath.CREATE_USERS)
  async createUsers(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }
}
