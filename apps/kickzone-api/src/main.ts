import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
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

  // CORS configuration - supports both development and production subdomains
  const allowedOrigins = [
    // Development origins
    'https://localhost:4300',
    'https://localhost:4400',
    'https://localhost:4500',
    'https://studio.apollographql.com',
    // Production origins
    'https://masterskey.store',
    'https://www.masterskey.store',
    'https://admins.masterskey.store',
    'https://seller.masterskey.store',
  ];

  // Add additional origins from environment variable if provided
  if (process.env.ALLOWED_ORIGINS) {
    allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders: 'Content-Type,Authorization',
  });
  app.use(cookieParser());

  // Add graphql-upload middleware
  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000, // 10 MB
      maxFiles: 10,
    })
  );

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
