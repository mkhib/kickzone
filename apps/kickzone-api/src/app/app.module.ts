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
import { AuthService } from '@kickzone-workspace/services';
import { GraphqlContextModule } from '@kickzone-workspace/modules';

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
    GraphqlContextModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [GraphqlContextModule],
      inject: [AuthService],
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: join(
          process.cwd(),
          'libs/shared/graphql-schema/src/lib/schema.gql'
        ),
        playground: true,
        introspection: true,
        buildSchemaOptions: {
          numberScalarMode: 'integer',
        },
        uploads: false, // Disable built-in upload handling since we're using graphql-upload middleware
        context: async ({ req, res }) => {
          // Get the token from cookies
          const token = req.cookies['access_token'];
          if (token) {
            // Verify and get user
            const user = await authService.verifyToken(token);
            if (user) {
              req.user = user;
            }
          }
          return { req, res };
        },
      }),
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
