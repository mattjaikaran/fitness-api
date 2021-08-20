import { EntityRepository, Repository } from 'typeorm';
import { BoxesEntity } from '../entities/box.entity';

@EntityRepository(BoxesEntity)
export class BoxesRepository extends Repository<BoxesEntity> {}
