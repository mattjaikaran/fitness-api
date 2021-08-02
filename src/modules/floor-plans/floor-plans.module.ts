import { Module } from '@nestjs/common';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { FloorPlansController } from './floor-plans.controller';
import { FloorPlansService } from './floor-plans.service';

@Module({
  imports: [MainMysqlModule],
  controllers: [FloorPlansController],
  providers: [FloorPlansService],
})
export class FloorPlansModule {}
