import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { PermissionEntity } from '../../../entities/permissions.entity';
import { UserEntity } from './user.entity';

@Entity({ name: TABLES.USER_HAS_PERMISSIONS.name })
export class UserHasPermissionEntity {
  @PrimaryColumn({ type: 'int', unsigned: true }) public userId: number;
  @PrimaryColumn({ type: 'int', unsigned: true }) public permId: number;
  @ManyToOne(() => PermissionEntity, (perm) => perm.userHasPermissionEntity)
  public perm!: PermissionEntity;
  @ManyToOne(() => UserEntity, (user) => user.userHasPermissionEntity)
  public user!: UserEntity;
}
// action, subject, conditions  roleId
