import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  Product,
  ProductInfo,
  SellerInfo,
  SellerProduct,
  User,
} from '@kickzone-workspace/entities';
import {
  AuthModule,
  CategoryModule,
  ProductInfoModule,
  ProductModule,
  SellerInfoModule,
  SellerProductsModule,
  UserModule,
} from '@kickzone-workspace/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Product,
        ProductInfo,
        Category,
        SellerProduct,
        SellerInfo,
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    ProductInfoModule,
    SellerInfoModule,
    SellerProductsModule,
  ],
})
export class AppModule {}
