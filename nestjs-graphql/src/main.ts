import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import * as jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      console.error('Invalid server token', error);
    }
  }
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(authMiddleware);
  await app.listen(3000);
}
bootstrap();

