import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import * as mtz from 'moment-timezone';
import { env } from 'process';
import { AppModule } from './app.module';
import { logger } from './services/logs/log.storage';

async function bootstrap() {
  const port = env.port || 4000;
  const globalPrefix = 'api';
  if (true) {
    // NestFactory.createApplicationContext(SeederModule)
    //   .then((appContext) => {
    //     const seeder = appContext.get(SeederService);
    //     seeder
    //       .sow({ klass: 'RolesSeed', up: true })
    //       .then(() => {
    //         //console.log('Roles Seeding complete!');
    //       })
    //       .catch((error) => {
    //         //console.log('Roles Seeding failed!');
    //         throw error;
    //       });
    //     seeder
    //       .sow({ klass: 'CreateAdminSeed', up: true })
    //       .then(() => {
    //         //console.log('user Seeding complete!');
    //       })
    //       .catch((error) => {
    //         //console.log('User Seeding failed!');
    //         throw error;
    //       })
    //       .finally(() => {
    //         appContext.close();
    //       });
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
  }

  const app = await NestFactory.create(AppModule, { ...logger, cors: true });
  mtz.tz.setDefault('UTC');
  const config = new DocumentBuilder()
    .setTitle('Colony API')
    .setDescription('Colony API Docs')
    .addServer('/api')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('colony')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix(globalPrefix);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(port, () => {
    console.log(
      'Listening API at http://localhost:' + port + '/' + globalPrefix,
    );
  });
}
bootstrap();
