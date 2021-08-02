import { features } from 'process';
import { BoxFeaturesEntity } from 'src/modules/box/entities/box-features.entity';
import { BoxesEntity } from 'src/modules/box/entities/box.entity';
import { UserToRoleEntity } from 'src/modules/users/entities/user-to-role.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../consts/tables.const';


@Entity({ name: TABLES.FEATURES.name })
export class FeaturesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => BoxFeaturesEntity, (feature) => feature.feature)
  public boxFeatures!: BoxFeaturesEntity[];

  @ManyToMany(() => BoxesEntity, (box) => box.features)
  public boxes: BoxesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}