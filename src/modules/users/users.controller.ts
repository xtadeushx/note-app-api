import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUsers(@Body() dto: CreateUserDto) {
    try {
      this.usersService.createUser(dto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Bad request');
    }
  }
}
