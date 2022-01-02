import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movies } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private database: PrismaService) {}

  async create(data: CreateMovieDto): Promise<Movies> {
    if (!data.name || !data.year || !data.description) {
      throw new NotAcceptableException('All fields are required');
    }

    const movieExists = await this.database.movies.findFirst({
      where: { name: data.name },
    });

    if (movieExists) {
      throw new ConflictException(
        `There is a movie already registered with this name under ID ${movieExists.id}`,
      );
    }

    const movie = await this.database.movies.create({ data });

    return movie;
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
