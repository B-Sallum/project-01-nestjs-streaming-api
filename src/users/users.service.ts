import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
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
    if (
      !data.name ||
      !data.age ||
      !data.email ||
      !data.pass ||
      !data.passConfirm
    ) {
      throw new NotAcceptableException('All fields are required');
    }

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
