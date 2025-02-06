import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@kickzone-workspace/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'm1k1h1i1b1',
      database: 'kickzone_db',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

/**
 * DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=m1k1h1i1b1
DB_NAME=airzone_db
JWT_SECRET=jE5QOJGltFBDwMQElUWtNSNfS8/kcVkWt/IZ8UliQPg=
SALT_ROUNDS=12
NX_APP_NAME=AIRZONE
 */
