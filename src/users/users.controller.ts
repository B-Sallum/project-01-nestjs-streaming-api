import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('register')
  create(@Body() data: CreateUserDto): Promise<Users> {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<Users> {
    return this.service.update(id, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Users> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.remove(id);
  }
}
