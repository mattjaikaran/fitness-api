import { EntityRepository, Repository } from 'typeorm';
import { FloorPlansEntity } from '../entities/floor-plans.entity';

@EntityRepository(FloorPlansEntity)
export class FloorPlansRepository extends Repository<FloorPlansEntity> {}
