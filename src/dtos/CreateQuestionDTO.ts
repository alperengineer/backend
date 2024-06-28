import { IsNotEmpty, IsString, IsEnum, IsNumber, IsInt } from 'class-validator';
import { AnswerType } from 'src/entities/Question';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsEnum(AnswerType)
  answerType: AnswerType;

  @IsNotEmpty()
  @IsInt()
  timeLimitInSecond: number;

  @IsNotEmpty()
  @IsInt()
  gameId: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
