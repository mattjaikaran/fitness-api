import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';

@Entity({ name: TABLES.IMAGES.name })
export class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  modelName: string;

  @Column({ unsigned: true })
  modelId: number;

  @Column({ unsigned: true })
  userId: number;

  @Column({ type: 'text' })
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
