import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from 'src/user-roles/entities/user-role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  users: UserRole[];
}
