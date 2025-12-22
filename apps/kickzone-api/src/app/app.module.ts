import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  Product,
  ProductInfo,
  SellerInfo,
  SellerProduct,
  User,
  Color,
  Order,
  OrderItem,
  Cart,
  CartItem,
  CustomerProfile,
  Translation,
  Currency,
  ExchangeRate,
  CurrencyPreference,
  PlatformSettings,
} from '@kickzone-workspace/entities';
import {
  AuthModule,
  CategoryModule,
  ProductInfoModule,
  ProductModule,
  SellerInfoModule,
  SellerProductsModule,
  UserModule,
  ColorModule,
  OrderModule,
  CartModule,
  TranslationModule,
  CurrencyModule,
  CustomerProfileModule,
  PlatformSettingsModule,
  PaymentModule,
} from '@kickzone-workspace/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthService } from '@kickzone-workspace/services';
import { GraphqlContextModule } from '@kickzone-workspace/modules';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  singleLine: true,
                },
              },
        redact: ['req.headers.authorization', 'req.headers.cookie'],
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
        Color,
        Order,
        OrderItem,
        Cart,
        CartItem,
        CustomerProfile,
        Translation,
        Currency,
        ExchangeRate,
        CurrencyPreference,
        PlatformSettings,
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
          // Get the locale from headers
          const locale = req.headers['x-locale'] || 'en';
          req.locale = locale;

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
    ColorModule,
    OrderModule,
    CartModule,
    TranslationModule,
    CurrencyModule,
    CustomerProfileModule,
    PlatformSettingsModule,
    PaymentModule,
  ],
})
export class AppModule {}
