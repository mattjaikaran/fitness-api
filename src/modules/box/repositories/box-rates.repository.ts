import { EntityRepository, Repository } from 'typeorm';
import { BoxRatesEntity } from '../entities/box-rate.entity';

@EntityRepository(BoxRatesEntity)
export class BoxRatesRepository extends Repository<BoxRatesEntity> {}
