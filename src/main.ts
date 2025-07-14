import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);

  app.enableCors({
  origin: ['https://web.telegram.org', 'https://t.me', 'http://localhost:3000', 'https://your-ngrok-url.ngrok-free.app'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
});
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`, req.body);
  next();
});
}
bootstrap();
