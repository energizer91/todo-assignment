import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT;

if (!port) {
  throw new Error('Port is not defined');
}

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
