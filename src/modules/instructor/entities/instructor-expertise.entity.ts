import { ExpertiseEntity } from 'src/modules/settings/entities/expertis.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';

@Entity({ name: TABLES.INSTRUCTOR_EXPERTISE.name })
export class InstructorExpertiseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.expertise)
  public user: UserEntity;

  @ManyToOne(() => ExpertiseEntity, (e) => e.expertise, { eager: true })
  public expertise: ExpertiseEntity;

  @Column({ unsigned: true, default: 0 })
  yearsOfExperience: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
