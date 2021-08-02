import { Module } from '@nestjs/common';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [MainMysqlModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
