import { Module } from '@nestjs/common';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [MainMysqlModule],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class ServicesModule {}
