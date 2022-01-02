import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMovieDto {
  @IsString({ message: 'Insert a valid name' })
  @IsNotEmpty({ message: 'Movie name is required' })
  name: string;

  @IsString({ message: 'Insert a valid year' })
  @IsNotEmpty({ message: 'Movie year is required' })
  year: string;

  @IsString()
  @IsNotEmpty({
    message: 'Please insert at least 10 characters for description',
  })
  @Length(10)
  description: string;
}
