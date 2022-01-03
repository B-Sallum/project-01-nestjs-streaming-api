import { Injectable, NotFoundException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService) {}

  async login(loginData: CredentialsDto) {
    const checkUser = await this.database.users.findUnique({
      where: { email: loginData.email },
    });

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    const passValidation = await bcrypt.compare(loginData.pass, checkUser.pass);

    if (passValidation) {
      return 'Welcome';
    } else {
      return 'Sorry';
    }
  }
}
