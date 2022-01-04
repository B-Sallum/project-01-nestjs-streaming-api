import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('register')
  create(@Body() data: CreateUserDto): Promise<Users> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<Users> {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Users> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.remove(id);
  }

  @UseGuards(AuthGuard())
  @Patch('fav/:id')
  addFav(@AuthUser() user: Users, @Param('id') movieId: string) {
    return this.service.favorite(user, movieId);
  }
}
