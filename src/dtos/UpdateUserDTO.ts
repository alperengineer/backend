import { IsEmail, IsEnum, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { Gender } from 'src/entities/User';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsNumber()
  score?: number;
}
