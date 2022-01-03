import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) {}

  async login(loginData: CredentialsDto) {
    const { email, pass } = loginData;

    const user = await this.database.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ok = await bcrypt.compare(pass, user.pass);

    if (ok) {
      const payload = {
        id: user.id,
      };

      const token = this.jwt.sign(payload);

      return { token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
