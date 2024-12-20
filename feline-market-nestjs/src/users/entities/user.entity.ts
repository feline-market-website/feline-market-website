import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => UserRole, userRole => userRole.user, {cascade: true})
  roles: UserRole[];

  @OneToOne(()=> UserProfile, userProfile=>userProfile.user, {cascade: true})
  user_profile: UserProfile

  @OneToOne(()=> Vendor, vendor=> vendor.user, {cascade: true})
  vendor: Vendor
}
