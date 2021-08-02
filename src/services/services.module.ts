import { Module } from '@nestjs/common';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { PermissionsService } from './permissions.service';
import { RolesService } from './roles.service';

@Module({
  imports: [MainMysqlModule],
  providers: [PermissionsService, RolesService],
  exports: [PermissionsService, RolesService],
})
export class ServicesModule {}
