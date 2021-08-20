import { EntityRepository, Repository } from 'typeorm';
import { DaysEntity } from '../entities/days.entity';

@EntityRepository(DaysEntity)
export class DaysRepository extends Repository<DaysEntity> {}
