import { ConflictException, Injectable } from '@nestjs/common';
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

  async findAll(): Promise<CreateMovieDto[]> {
    const movies = await this.database.movies.findMany();
    return movies;
  }

  async findOne(id: string): Promise<CreateMovieDto> {
    const movie = await this.database.movies.findUnique({
      where: { id: id },
    });
    return movie;
  }

  async update(id: string, data: UpdateMovieDto): Promise<Movies> {
    const update = await this.database.movies.update({
      where: { id: id },
      data: data,
    });
    return update;
  }

  async remove(id: string): Promise<string> {
    await this.database.movies.delete({
      where: { id: id },
    });
    return 'Movie successfully deleted';
  }
}
