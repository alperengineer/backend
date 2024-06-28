import { IsOptional, IsNumber, IsString, IsEnum } from 'class-validator';
import { GameMode } from 'src/entities/Game';

export class UpdateGameDto {
  @IsOptional()
  @IsNumber()
  PIN?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  personLimit?: number;

  @IsOptional()
  @IsEnum(GameMode)
  gameMode?: GameMode;
}
