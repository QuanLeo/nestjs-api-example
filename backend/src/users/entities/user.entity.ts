import { Exclude } from 'class-transformer';
import { UserRole, UserState } from 'src/constant';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({ nullable: true, default: '123456' })
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: number;

  @Column('json', { nullable: true }) //for optional
  permission: object[];

  @Column({ nullable: true, default: '/default/images/default_avatar.jpg' })
  avatar?: string;

  @Column({ nullable: true })
  dob?: string;

  @Column({ nullable: true, default: null })
  sex?: string;

  @Column({ nullable: true, default: null })
  phone_number?: string;

  @Column({ nullable: true, default: 1 })
  labor_contract?: number;

  @Column({ type: 'float', nullable: true, default: 0.0 })
  day_off?: number;

  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.UNACTIVE,
  })
  active?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
