import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TABLES } from '../consts/tables.const';
import { PermissionEntity } from './permissions.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: TABLES.ROLE_HAS_PERMISSIONS.name })
export class RoleHasPermissionEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  public roleId!: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  public permId: number;

  @ManyToOne(() => PermissionEntity, (perm) => perm.roleHasPermissionEntity)
  public perm!: PermissionEntity;

  @ManyToOne(() => RoleEntity, (role) => role.roleHasPermissionEntity)
  public role!: RoleEntity;
}
