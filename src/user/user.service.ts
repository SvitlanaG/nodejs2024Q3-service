/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4, validate as isUuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const user: User = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user);
  }

  findOne(id: string): Omit<User, 'password'> {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const currentUser = this.users[userIndex];
    if (currentUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }

    const updatedUser: User = {
      ...currentUser,
      password: updatePasswordDto.newPassword,
      version: currentUser.version + 1,
      updatedAt: Date.now(),
    };

    this.users[userIndex] = updatedUser;
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  remove(id: string): void {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(userIndex, 1);
  }
}
