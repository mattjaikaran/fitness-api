import { InstructorExpertiseEntity } from 'src/modules/instructor/entities/instructor-expertise.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';

@Entity({ name: TABLES.EXPERTISE.name })
export class ExpertiseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => InstructorExpertiseEntity, (ie) => ie.expertise)
  public expertise: InstructorExpertiseEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
