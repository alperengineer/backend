import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { GameMode } from 'src/entities/Game';

export class CreateGameDto {
  @IsNotEmpty()
  @IsNumber()
  PIN: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  personLimit?: number;

  @IsNotEmpty()
  @IsEnum(GameMode)
  gameMode: GameMode;
}
