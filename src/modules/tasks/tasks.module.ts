import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/services/mail/mail.module';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'base_queue',
    }),
    MainMysqlModule,
    MailModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
