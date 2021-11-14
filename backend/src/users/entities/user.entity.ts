import { Exclude } from 'class-transformer';
import { UserRole, UserState } from 'src/common/constant';

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

  @Column({ nullable: true, default: '/default/images/default_avatar.jpg' })
  avatar?: string;

  @Column({ nullable: true })
  dob?: string;

  @Column({ nullable: true, default: null })
  sex?: string;

  @Column({ nullable: true, default: null })
  phone_number?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: string;

  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.UNACTIVE,
  })
  active?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
