import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.user_profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  last_name: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone_number: string;

  @Column({ type: 'text', nullable: true })
  shipping_address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;
}
