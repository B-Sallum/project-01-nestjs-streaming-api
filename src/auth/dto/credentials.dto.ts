import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  pass: string;
}
