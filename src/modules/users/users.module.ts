import { Module } from '@nestjs/common';
import { MailModule } from 'src/services/mail/mail.module';
import { MainMysqlModule } from '../../shared/main-mysql.module';
import { RolesService } from '../../services/roles.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MainMysqlModule,  MailModule, ],
  controllers: [UsersController],
  providers: [
    UsersService,
    RolesService,
  ],
  exports: [UsersService, RolesService],
})
export class UsersModule {}
