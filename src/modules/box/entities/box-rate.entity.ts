import { TimingsEntity } from 'src/modules/settings/entities/timings.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { BoxesEntity } from './box.entity';

@Entity({ name: TABLES.BOX_RATES.name })
export class BoxRatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BoxesEntity, (b) => b.rates, {
    cascade: true,
  })
  box: BoxesEntity;
  @RelationId('box')
  boxId: number;

  @ManyToOne(() => TimingsEntity, (t) => t.rates, {
    eager: true,
    cascade: true,
  })
  timing: TimingsEntity;
  @RelationId('timing')
  timingId: number;

  @Column({ type: 'decimal', nullable: false, default: 0, unsigned: true })
  rate: number;
}
