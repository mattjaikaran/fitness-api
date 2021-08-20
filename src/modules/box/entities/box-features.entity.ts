import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';
import { FeaturesEntity } from '../../../modules/settings/entities/features.entity';
import { BoxesEntity } from './box.entity';

@Entity({ name: TABLES.BOX_FEATURES.name })
export class BoxFeaturesEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  public boxId!: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  public featureId!: number;

  @ManyToOne(() => FeaturesEntity, (feature) => feature.boxFeatures)
  public feature!: FeaturesEntity;

  @ManyToOne(() => BoxesEntity, (box) => box.boxFeatures)
  public box!: BoxesEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
