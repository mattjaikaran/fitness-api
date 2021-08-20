import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { TABLES } from 'src/consts/tables.const';
import { ROLES } from 'src/services/access-control/consts/roles.const';
import { error } from 'src/shared/error.dto';
import {
  columnListToSelect,
  dataViewer,
  mapColumns,
  paginateQuery,
  PaginatorError,
  PaginatorErrorHandler,
} from 'src/shared/paginator';
import { Not } from 'typeorm';
import { RoleRepository } from '../../../repos/roles.repo';
import { PasswordHashEngine } from '../../../shared/hash.service';
import { isExist } from '../../../shared/repo.fun';
import { UserEntity } from '../entities/user.entity';
import {
  EmailAlreadyExistError,
  PhoneAlreadyExistError,
  UserNameAlreadyExistError,
} from '../errors/users.error';
import { UserRepository } from '../repos/user.repo';
import {
  CreateUserDto,
  UpdateProfileDto,
  UpdateProfilePasswordDto,
  UpdateRole,
} from '../users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.repository.find({
      relations: ['roles'],
    });
  }

  async save(user: any) {
    return this.repository.save(user);
  }

  async findOne(condition?: any): Promise<UserEntity> {
    return this.repository.findOne(condition);
  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { email } });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async isEmailExists(val: any) {
    return isExist(this.repository, 'email', val);
  }

  async isUserNameExists(val: any) {
    return isExist(this.repository, 'username', val);
  }

  async isPhoneExists(val: any) {
    return isExist(this.repository, 'mobile', val);
  }

  async getAllUsers(data: any) {
    try {
      const userTable = TABLES.USERS.name;
      const columnList: any = {
        id: { table: userTable, column: 'id' },
        firstName: { table: userTable, column: 'firstName' },
        lastName: { table: userTable, column: 'lastName' },
        username: { table: userTable, column: 'username' },
        email: { table: userTable, column: 'email' },
        createdAt: { table: userTable, column: 'createdAt' },
        gender: { table: userTable, column: 'gender' },
        mobile: { table: userTable, column: 'mobile' },
        //password: { table: userTable, column: 'password' },
        image: { table: userTable, column: 'image' },
        isActive: {
          table: userTable,
          column: 'isActive',
          valueMapper: (v: any) => (v ? 'YES' : 'NO'),
        },
      };
      const sortList = {
        firstName: { table: userTable, column: 'firstName' },
      };
      const filterList = {
        firstName: { table: userTable, column: 'firstName' },
        isActive: {
          table: userTable,
          column: 'isActive',
          valueMapper: (v: any) => Number(v === 'YES'),
        },
      };
      const { filters, configs } = dataViewer({
        data,
        filterList,
        sortList,
        columnList,
      });
      const query = await this.repository
        .createQueryBuilder(TABLES.USERS.name)
        .select(columnListToSelect(columnList))
        .where(filters.sql);

      const paginatedData = await paginateQuery(query, configs, userTable);
      if (paginatedData.data.length) {
        paginatedData.data = paginatedData.data.map(
          mapColumns(paginatedData.data[0], columnList),
        );
      }
      return { data: paginatedData.data, meta: paginatedData.meta };
    } catch (error) {
      if (error instanceof PaginatorError) {
        throw PaginatorErrorHandler(error);
      }
      throw error;
    }
  }

  isValidEmail(email: string) {
    if (email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }

  async createUser(user: CreateUserDto) {
    try {
      if (user.role === ROLES.ADMIN) {
        throw new BadRequestException('Admin registration is forbidden.');
      }
      if (this.isValidEmail(user.email.toLowerCase())) {
        let count = await this.repository.count({
          where: { email: user.email.toLowerCase() },
        });

        if (count > 0) {
          throw new BadRequestException(EmailAlreadyExistError);
        }

        count = await this.repository.count({
          where: { username: user.username.toLowerCase() },
        });
        if (count > 0) {
          throw new BadRequestException(UserNameAlreadyExistError);
        }
        count = await this.repository.count({
          where: { mobile: user.mobile },
        });
        if (count > 0) {
          throw new BadRequestException(PhoneAlreadyExistError);
        }

        user.password = await PasswordHashEngine.make(user.password);
        user.urlId = nanoid(10);
        user.username = user.username.toLowerCase();
        const newUser: UserEntity = await this.repository.save(user);
        const roles = await this.roleRepository.findOne({
          where: { role: user.role },
        });
        await this.updateRoles(newUser.id, {
          userId: newUser.id,
          roleId: [roles.id],
        });

        return { user: newUser };
      } else {
        throw new BadRequestException('Invalid email format');
      }
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string | number | any, user: UpdateProfileDto) {
    const updateData = await this.repository.findOne({
      where: { id: id },
    });
    // let isAlreadyExist: any;
    try {
      const phone = await this.repository.findOne({
        where: { mobile: user.mobile, id: Not(id) },
      });
      if (phone) {
        throw new HttpException(
          'Phone number already exists.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (user.mobile) {
        updateData.mobile = user.mobile;
      }
      if (user.meta) {
        updateData.meta = user.meta;
      }

      if (user.gender) {
        updateData.gender = user.gender;
      }
      if (user.dob) {
        updateData.dob = user.dob ? user.dob : null;
      }

      if (user.statusMessage) {
        updateData.statusMessage = user.statusMessage;
      }

      if (user.firstName) {
        updateData.firstName = user.firstName;
      }

      if (user.lastName) {
        updateData.lastName = user.lastName;
      }
      updateData.timezone = user.timezone;
      //console.log('updateData: ', updateData);
      //console.log('user: ', user);

      await this.repository.save(updateData);
      return { message: 'User details updated.' };
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(
    id: string | number | any,
    data: UpdateProfilePasswordDto,
  ) {
    const updateData = await this.repository.findOne({
      where: { id: id },
    });

    try {
      if (data.password && !data.oldPassword) {
        throw new HttpException(
          error(
            [
              {
                key: 'oldPassword',
                reason: 'MissingValue',
                description: 'Your old password cannot be empty.',
              },
            ],
            HttpStatus.UNPROCESSABLE_ENTITY,
            'Unprocessable entity',
          ),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      if (!data.password && data.oldPassword) {
        throw new HttpException(
          error(
            [
              {
                key: 'password',
                reason: 'MissingValue',
                description: 'Password cannot be empty.',
              },
            ],
            HttpStatus.UNPROCESSABLE_ENTITY,
            'Unprocessable entity',
          ),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (!data.confirmPassword && data.password) {
        throw new HttpException(
          error(
            [
              {
                key: 'confirmPassword',
                reason: 'MissingValue',
                description: 'Confirm Password cannot be empty.',
              },
            ],
            HttpStatus.UNPROCESSABLE_ENTITY,
            'Unprocessable entity',
          ),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      if (data.password && data.oldPassword) {
        if (data.oldPassword == data.password) {
          throw new HttpException(
            error(
              [
                {
                  key: 'password',
                  reason: 'Mismatch',
                  description:
                    'Your old password is same as new password you have provided.',
                },
              ],
              HttpStatus.UNPROCESSABLE_ENTITY,
              'Unprocessable entity',
            ),
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const oldPassword = await PasswordHashEngine.check(
          data.oldPassword,
          updateData.password,
        );
        if (!oldPassword) {
          throw new HttpException(
            error(
              [
                {
                  key: 'oldPassword',
                  reason: 'Mismatch',
                  description:
                    'Your old password does not match with password you have provided.',
                },
              ],
              HttpStatus.UNPROCESSABLE_ENTITY,
              'Unprocessable entity',
            ),
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        data.password = await PasswordHashEngine.make(data.password);
        updateData.password = data.password;
      }
      await this.repository.save(updateData);
      return { message: 'Password changed.' };
    } catch (error) {
      throw error;
    }
  }

  async updateRoles(id: string | number, user: UpdateRole) {
    const RoleId = user.roleId;
    const users = await this.repository.findOne(id, {
      relations: ['roles'],
    });
    //console.log(users);

    // await this.repository.save(users);
    const allRoles = await this.roleRepository
      .createQueryBuilder('s')
      .where(' s.id IN (:...RoleId)', { RoleId })
      .getMany();
    //console.log(allRoles);
    users.roles = allRoles;
    await this.repository.save(users);
  }

  async deleteUserPic(user: UserEntity) {
    const dbRes = await this.repository.update(user.id, { image: null });
    return dbRes;
  }

  async setProfileImage(user: UserEntity, file: any) {
    if (user.image) {
      const filePath = join(__dirname, '../../../..', 'uploads', user.image);
      fs.unlinkSync(filePath);
    }
    user.image = file.filename;
    await this.repository.save(user);
    return { profileImage: user.image };
  }

  async searchUserForAuth(username: string) {
    try {
      const user = await this.repository
        .createQueryBuilder('users')
        .where('users.username = :val OR users.email = :val', {
          val: username.toLowerCase(),
        })
        .getOne();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async isTFARequire(username: string) {
    try {
      const user = await this.repository
        .createQueryBuilder('users')
        .select("users.meta->'$.TFARequire' as 'TFARequire'")
        .where('users.username = :val OR users.email = :val', { val: username })
        .getRawOne();
      return { TFARequire: !!(user.TFARequire && user.TFARequire !== 'false') };
    } catch (error) {
      throw error;
    }
  }
}
