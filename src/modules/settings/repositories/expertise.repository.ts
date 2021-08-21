import { EntityRepository, Repository } from 'typeorm';
import { ExpertiseEntity } from '../entities/expertis.entity';

@EntityRepository(ExpertiseEntity)
export class ExpertiseRepository extends Repository<ExpertiseEntity> {}
