import { BoxRatesEntity } from 'src/modules/box/entities/box-rate.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { DaysEntity } from './days.entity';

@Entity({ name: TABLES.TIMINGS.name })
export class TimingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @OneToOne(() => DaysEntity, (days) => days.id)
  @JoinColumn()
  day: DaysEntity;

  @OneToMany(() => BoxRatesEntity, (d) => d.box, {
    nullable: false,
  })
  rates!: BoxRatesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
