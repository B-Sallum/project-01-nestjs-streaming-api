import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from '@prisma/client';
import AuthUser from './auth-user.decorator';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: CredentialsDto) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard())
  @Get('myprofile')
  profile(@AuthUser() user: Users) {
    return user;
  }
}
