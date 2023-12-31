import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

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
      include: {
        model: Watchlist,
        required: false,
      },
    });
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, { where: { email: email } });
    return dto;
  }

  async deleteUser(email: string): Promise<string> {
    await this.userRepository.destroy({ where: { email: email } });
    return `user with email  ${email} was deleted`;
  }
}
