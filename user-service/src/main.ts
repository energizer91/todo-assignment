import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT;

if (!port) {
  throw new Error('Port is not defined');
}

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.use(cookieParser());
  await app.listen(port);
}

bootstrap();
