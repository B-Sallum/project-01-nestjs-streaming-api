import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movies } from '@prisma/client';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private database: PrismaService) {}

  async create(data: CreateMovieDto): Promise<Movies> {
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

  async findAll(): Promise<UpdateMovieDto[]> {
    const dbMovies = await this.database.movies.findMany();
    const movies = dbMovies.map(({ createdAt, updatedAt, ...rest }) => rest);
    return movies;
  }

  async findOne(id: string): Promise<Movies> {
    const movie = await this.database.movies.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async update(id: string, data: UpdateMovieDto): Promise<UpdateMovieDto> {
    const checkMovie = await this.database.movies.findUnique({
      where: { id },
    });

    if (!checkMovie) {
      throw new NotFoundException('Movie not found');
    }

    const movie = await this.database.movies.update({
      where: { id },
      data: data,
    });

    delete movie.createdAt;
    delete movie.updatedAt;

    return movie;
  }

  async remove(id: string): Promise<{ message: string }> {
    const movie = await this.database.movies.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.database.movies.delete({
      where: { id },
    });

    return {
      message: 'Movie successfully deleted',
    };
  }
}
