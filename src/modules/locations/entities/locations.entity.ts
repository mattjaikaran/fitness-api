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

@Entity({ name: TABLES.LOCATIONS.name })
export class LocationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 20 })
  contactNumber: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => BoxesEntity, (d) => d.location, {
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
