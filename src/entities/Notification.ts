import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { CommonEntityFields } from './CommonEntityFields';

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
}

@Entity({ name: 'notifications' })
export class Notification extends CommonEntityFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: NotificationType })
  notificationType: NotificationType;

  @Column()
  isActive: boolean;

  @Column()
  isSeen: boolean;

  @ManyToOne(() => User, user => user.notifications)
  user: User;
}
