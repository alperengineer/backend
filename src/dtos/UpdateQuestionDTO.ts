import { IsOptional, IsString, IsEnum, IsNumber, IsInt } from 'class-validator';
import { AnswerType } from 'src/entities/Question';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsEnum(AnswerType)
  answerType?: AnswerType;

  @IsOptional()
  @IsInt()
  timeLimitInSecond?: number;

  @IsOptional()
  @IsInt()
  gameId?: number;

  @IsOptional()
  @IsNumber()
  score?: number;
}
