// import { ConfigModule } from '@nestjs/config';
// ConfigModule.forRoot();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const configService = app.get(ConfigService);

//   app.enableCors(); // Allow CORS if needed for frontend integration
//   await app.listen(configService.get('PORT') || 3000);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: 'https://user-registration-app-chi.vercel.app', // frontend address
    origin: 'http://localhost:5173', // frontend address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(3000);
}
bootstrap();
