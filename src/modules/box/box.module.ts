import { Module } from '@nestjs/common';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';

@Module({
  imports: [MainMysqlModule],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
