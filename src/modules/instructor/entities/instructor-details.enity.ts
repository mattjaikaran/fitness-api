import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';

@Entity({ name: TABLES.INSTRUCTOR_DETAILS.name })
export class InstructorDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  instagram: string;

  @Column({ length: 100 })
  facebook: string;

  @Column({ length: 100 })
  tiktok: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'text' })
  expertiseSummary: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  public user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
