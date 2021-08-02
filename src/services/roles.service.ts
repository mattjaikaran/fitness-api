import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repos/roles.repo';
import { isExist } from '../shared/repo.fun';
import { RoleAlreadyExistError } from '../modules/users/errors/roles.error';
import { RoleEntity } from 'src/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RoleRepository) {}

  public async findOne(condition?: any) {
    if (condition) return this.repository.findOne(condition);
    else return this.repository.findOne();
  }

  public async find(condition?: any) {
    if (condition) return this.repository.find(condition);
    else return this.repository.find();
  }
  async isRoleExists(val: any) {
    return isExist(this.repository, 'role', val);
  }

  async createRole(role: string) {
    try {
      const isAlreadyExist = await this.isRoleExists(role);
      if (isAlreadyExist) {
        throw RoleAlreadyExistError;
      }
      const newRole = await this.repository.save({ role });
      return newRole;
    } catch (error) {
      throw error;
    }
  }


  findAll(): Promise<RoleEntity[]> {
    return this.repository.find();
  }
}
