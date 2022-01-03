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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movies } from '@prisma/client';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {}

  @UseGuards(AuthGuard())
  @Post('new')
  create(@Body() data: CreateMovieDto): Promise<Movies> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll(): Promise<UpdateMovieDto[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movies> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateMovieDto,
  ): Promise<UpdateMovieDto> {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.remove(id);
  }
}
