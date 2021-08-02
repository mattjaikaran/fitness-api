import { classToPlain, Exclude } from 'class-transformer';
import { RoleEntity } from 'src/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { UserToRoleEntity } from './user-to-role.entity';

enum gender {
  male = 'male',
  female = 'female',
}

@Entity({ name: TABLES.USERS.name })
export class UserEntity {
  [x: string]: any;
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;

  @Column({ length: 60, nullable: false })
  public firstName: string;

  @Column({ length: 60, nullable: true })
  public lastName: string;

  @Column({ unique: true, length: 60, nullable: false })
  public username: string;

  @Column({ unique: true, length: 60, nullable: false })
  public email: string;

  @Column({ unique: true, length: 20, nullable: true })
  public mobile: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: 100 })
  public password: string;

  @Column({ type: 'enum', enum: gender, nullable: true })
  public gender: gender;

  @Column({ nullable: true })
  public dob: Date;

  @Column({ nullable: true, length: 300 })
  public statusMessage: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ default: false })
  public isActive: boolean;

  @Column({ default: false })
  public isApproved: boolean;

  @Column({ default: 0.0, type: 'decimal' })
  public consumedSmsCost: number;

  @Column({ default: 0.0, type: 'decimal' })
  public consumedSubscriberCost: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => UserToRoleEntity, (roles) => roles.user)
  public userToRole!: UserToRoleEntity[];

  @ManyToMany(() => RoleEntity, (roles) => roles.users, { eager: true })
  @JoinTable({
    name: TABLES.USER_ROLES.name,
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @Column({ length: 100, nullable: false, default: 'Asia/Karachi' })
  public timezone: string;

  @Column({ type: 'json', nullable: true })
  public meta: string;

  toJSON() {
    return classToPlain(this);
  }
}
