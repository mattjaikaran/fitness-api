import { UserToRoleEntity } from 'src/modules/users/entities/user-to-role.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TABLES } from '../consts/tables.const';
import { PermissionEntity } from './permissions.entity';
import { RoleHasPermissionEntity } from './role-has-permissions.entity';


@Entity({ name: TABLES.ROLES.name })
export class RoleEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;

  @Column({ length: 60 })
  public role: string;

  @OneToMany(() => UserToRoleEntity, (role) => role.role)
  public userToRole!: UserToRoleEntity[];

  @ManyToMany(() => UserEntity, (org) => org.roles)
  public users: UserEntity[];

  @OneToMany('RoleHasPermissionEntity', 'role')
  public roleHasPermissionEntity!: RoleHasPermissionEntity[];

  @ManyToMany('PermissionEntity', 'roles')
  perms: PermissionEntity[];
}
