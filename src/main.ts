import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: 'https://user-registration-app-chi.vercel.app', // frontend address
    origin: 'https://jwt-authentication-app-fe.vercel.app', // frontend address
    // origin: 'http://localhost:5173', // frontend address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(3000);
}
bootstrap();
