import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';
import { ExceptionMessage } from 'src/common/enums/enums';

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
    try {
      const existUser = await this.findUserByEmail(dto.email);
      if (existUser)
        throw new BadRequestException(ExceptionMessage.EMAIL_ALREADY_EXISTS);

      dto.password = await this.hashPassword(dto.password);
      const newUser = {
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,
      };
      await this.userRepository.create(newUser);
      return dto;
    } catch (error) {
      return error;
    }
  }
}
