import { EntityRepository, Repository } from 'typeorm';
import { TimingsEntity } from '../entities/timings.entity';

@EntityRepository(TimingsEntity)
export class TimingsRepository extends Repository<TimingsEntity> {}
