import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntityFields } from './CommonEntityFields';
import { Game } from './Game';


export enum AnswerType {
  MULTIPLE_CHOICE = 'multiple_choice',
  BOOLEAN_CHOICE = 'boolean_choice',
  SINGLE_CHOICE = 'single_choice',
  TEXT = 'text',
}

@Entity({ name: 'questions' })
export class Question extends CommonEntityFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ type: 'enum', enum: AnswerType })
  answerType: AnswerType;

  @Column()
  timeLimitInSecond: number;

  @OneToOne(() => Game)
  @JoinColumn()
  game: Game;

  @Column({ type: 'float' })
  score: number;
}
