import { Module } from '@nestjs/common';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [MainMysqlModule],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
