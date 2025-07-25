import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3001);

  /*
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`, req.body);
  next();
});*/

}
bootstrap();
