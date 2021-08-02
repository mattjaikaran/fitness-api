import { RoleEntity } from 'src/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { UserEntity } from './user.entity';

@Entity({ name: TABLES.USER_ROLES.name })
export class UserToRoleEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  public userId!: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  public roleId!: number;

  @Column({ type: 'json', nullable: true }) public meta: any;

  @ManyToOne(() => UserEntity, (user) => user.userToRole)
  public user!: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userToRole)
  public role!: RoleEntity;
}
