import { EntityRepository, Repository } from 'typeorm';
import { FeaturesEntity } from '../entities/features.entity';

@EntityRepository(FeaturesEntity)
export class FeaturesRepository extends Repository<FeaturesEntity> {}
