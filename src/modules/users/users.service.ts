import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) readonly userRepository: typeof User) {}

  private async hashPassword(
    password: string,
    salt: string | number = 10,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async createUser(dto): Promise<CreateUserDto> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create(dto);
    return dto;
  }
}
