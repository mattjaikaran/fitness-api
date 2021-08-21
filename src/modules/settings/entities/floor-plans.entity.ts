import { BoxesEntity } from 'src/modules/box/entities/box.entity';
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

@Entity({ name: TABLES.FLOOR_PLANS.name })
export class FloorPlansEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => BoxesEntity, (d) => d.floorPlan, {
    nullable: false,
  })
  boxes: BoxesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
