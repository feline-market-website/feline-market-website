import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

export enum UserRoleEnum {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
}

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CUSTOMER,
  })
  role: UserRoleEnum;

  @CreateDateColumn({ type: 'timestamp' })
  assigned_at: Date;
}
