import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUserDto } from './dto/public-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) readonly userRepository: typeof User) {}

  private async hashPassword(
    password: string,
    salt: string | number = 10,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async findUserByEmail(email: string): Promise<CreateUserDto | undefined> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await this.hashPassword(dto.password);
    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    };
    await this.userRepository.create(newUser);
    return dto;
  }

  async publicUser(email: string): Promise<PublicUserDto> {
    return await this.userRepository.findOne({
      where: { email: email },
      attributes: {
        exclude: ['password'],
      },
    });
  }
}
