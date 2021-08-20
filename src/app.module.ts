import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BoxModule } from './modules/box/box.module';
import { LocationsModule } from './modules/locations/locations.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UsersModule } from './modules/users/users.module';
import { SeederController } from './seeder/seeder.controller';
import { SeederProviders } from './seeder/seeder.module';
import { MailModule } from './services/mail/mail.module';
import { ServicesModule } from './services/services.module';
import { MainMysqlModule } from './shared/main-mysql.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api*'],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    AuthModule,
    UsersModule,
    MailModule,
    MainMysqlModule,
    ServicesModule,
    LocationsModule,
    BoxModule,
    SettingsModule,
  ],
  controllers: [AppController, SeederController],
  providers: [...SeederProviders, AppService],
})
export class AppModule {}
