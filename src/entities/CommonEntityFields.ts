import { CreateDateColumn, UpdateDateColumn, Column, DeleteDateColumn } from 'typeorm';

export abstract class CommonEntityFields {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
