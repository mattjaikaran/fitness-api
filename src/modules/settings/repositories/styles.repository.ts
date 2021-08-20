import { EntityRepository, Repository } from 'typeorm';
import { StylesEntity } from '../entities/styles.entity';

@EntityRepository(StylesEntity)
export class StylesRepository extends Repository<StylesEntity> {}
