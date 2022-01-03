import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: CreateUserDto): Promise<Users> {
    if (data.pass !== data.passConfirm) {
      throw new UnauthorizedException("Passwords don't match");
    } else {
      delete data.passConfirm;
    }

    const userExists = await this.db.users.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('E-mail already in use.');
    }

    const salt = 10;
    const hashPass = await bcrypt.hash(data.pass, salt);

    const user = await this.db.users.create({
      data: {
        ...data,
        pass: hashPass,
      },
    });

    delete user.pass;
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<Users> {
    const checkUser = await this.db.users.findUnique({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.db.users.update({
      where: { id },
      data: data,
    });

    delete user.pass;
    delete user.updatedAt;
    delete user.id;

    return user;
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.db.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.pass;
    delete user.updatedAt;
    delete user.id;

    return user;
  }

  async remove(id: string): Promise<{ message: string }> {
    const checkUser = await this.db.users.findUnique({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    await this.db.users.delete({
      where: { id },
    });

    return {
      message: 'User deleted',
    };
  }
}
