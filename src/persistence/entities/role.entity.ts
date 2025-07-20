import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PolicyRoleType } from '~/common/policy/constants';
import { PermissionEntity } from '~/persistence/entities/permission.entity';
import { UserEntity } from '~/persistence/entities/user.entity';

@Index(['name'])
@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description?: string | null;

  @Column({ default: true, name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'enum', enum: PolicyRoleType })
  type: PolicyRoleType;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  //#region Relations

  @OneToMany(() => PermissionEntity, (permission) => permission.role, { cascade: true })
  permissions: PermissionEntity[];

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  //#endregion
}
