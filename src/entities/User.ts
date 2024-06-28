import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CommonEntityFields } from './CommonEntityFields';
import { Notification } from './Notification';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'users' })
export class User extends CommonEntityFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @Column({ type: 'float' })
  score: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_friends',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'friendId',
      referencedColumnName: 'id'
    }
  })
  friends: User[];
}
