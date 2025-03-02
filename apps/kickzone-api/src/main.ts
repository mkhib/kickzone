import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: readFileSync('./localhost-key.pem'),
      cert: readFileSync('./localhost.pem'),
    },
  });

  console.log('this is module', module);

  if (module.hot) {
    Logger.log('HOT2');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.enableCors({
    origin: ['https://localhost:4200', 'https://studio.apollographql.com'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders: 'Content-Type,Authorization',
  });
  app.use(cookieParser());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
