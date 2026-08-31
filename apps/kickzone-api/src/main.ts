import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger as PinoLogger } from 'nestjs-pino';
import { join } from 'path';

import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import helmet from 'helmet';

type HotModule = {
  hot?: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  };
};

declare const module: HotModule;

async function bootstrap() {
  // In production we run behind nginx and terminate TLS there,
  // so the NestJS app should use plain HTTP.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));

  console.log('this is module', module);

  if (module.hot) {
    Logger.log('HOT2');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // CORS configuration - supports both development and production subdomains
  const allowedOrigins = [
    // Development origins (127.0.0.1 preferred; localhost kept for browser redirects)
    'https://127.0.0.1:4300',
    'https://127.0.0.1:4400',
    'https://127.0.0.1:4500',
    'https://localhost:4300',
    'https://localhost:4400',
    'https://localhost:4500',
    'https://studio.apollographql.com',
    // Production origins
    'https://saintbala.com',
    'https://www.saintbala.com',
    'https://admins.saintbala.com',
    'https://seller.saintbala.com',
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
  // Security headers (tuned for API behind nginx)
  app.use(
    helmet({
      contentSecurityPolicy: false, // APIs don’t need CSP; disable to avoid misconfig
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      hsts: process.env.NODE_ENV === 'production' ? undefined : false,
    })
  );
  if (process.env.NODE_ENV === 'production') {
    app.use(
      helmet.hsts({
        maxAge: 15552000, // 180 days
        includeSubDomains: true,
        preload: false,
      })
    );
  }

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
  await app.listen(port, '127.0.0.1');
  Logger.log(
    `🚀 Application is running on: http://127.0.0.1:${port}/${globalPrefix}`
  );
}

bootstrap();
