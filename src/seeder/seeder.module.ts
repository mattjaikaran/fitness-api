import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { ServicesModule } from 'src/services/services.module';
import { MainMysqlModule } from 'src/shared/main-mysql.module';
import { SeederService } from './seeder.service';
import { SEEDS } from './seeds.const';

export const SeederProviders: any = [SeederService, ...Object.values(SEEDS)];

@Module({
  imports: [MainMysqlModule, ServicesModule, UsersModule],
  providers: [SeederService, ...(Object.values(SEEDS) as any)],
  exports: [SeederService, ...(Object.values(SEEDS) as any)],
})
export class SeederModule {}
