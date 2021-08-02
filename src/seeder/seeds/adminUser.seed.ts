import { RoleRepository } from 'src/repos/roles.repo';
import { PasswordHashEngine } from 'src/shared/hash.service';
import { Seeder } from '../../decorators/common.decorator';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { UsersService } from '../../modules/users/services/users.service';
import { UpdateRole } from '../../modules/users/users.dto';
import { ISeed } from '../seeds.interface';

@Seeder()
export class CreateAdminSeed implements ISeed {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesRepo: RoleRepository,
  ) {}
  async up() {
    const admin = new UserEntity();
    admin.firstName = 'System';
    admin.lastName = 'Admin';
    admin.mobile = '+123456789';
    admin.password = await PasswordHashEngine.make('P@$$WORD1234');
    admin.username = 'admin';
    admin.email = 'admin@admin.com';
    admin.isActive = true;
    admin.isApproved = true;
    admin.statusMessage = "I'm system admin";
    const check = await this.usersService.findOne({
      where: { username: 'admin' },
    });

    if (!check) {
      const saved = await this.usersService.save(admin);
      const role = new UpdateRole();
      role.userId = saved.id;
      role.roleId = [
        await (
          await this.rolesRepo.findOne({
            where: { role: 'admin' },
          })
        ).id,
      ];
      const RoleId = role.roleId;
      const allRoles = await this.rolesRepo
        .createQueryBuilder('s')
        .where(' s.id IN (:...RoleId)', { RoleId })
        .getMany();
      admin.roles = allRoles;
      await this.usersService.save(admin);
    }
  }
  async down() {
    //
  }
}
