import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntityFields } from './CommonEntityFields';
import { Question } from './Question';

export enum GameMode {
  MULTIPLAYER = 'multi_player',
  SINGLEPLAYER = 'single_player',
}

@Entity({ name: 'games' })
export class Game extends CommonEntityFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PIN: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Question, question => question.game)
  questions: Question[];

  @Column({ nullable: true })
  personLimit: number;

  @Column({ type: 'enum', enum: GameMode })
  gameMode: GameMode;
}
