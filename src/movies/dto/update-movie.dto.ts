import { IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  name: string;

  @IsOptional()
  year: string;

  @IsOptional()
  description: string;
}
