import { RoleEntity } from 'src/entities/role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
