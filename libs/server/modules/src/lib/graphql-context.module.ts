import { Module } from '@nestjs/common';
import { AuthService } from '@kickzone-workspace/services';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './email.module';
import { TokenModule } from './token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from '@kickzone-workspace/entities';

@Module({
  imports: [
    UserModule,
    EmailModule,
    TokenModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'defaultSecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class GraphqlContextModule {}
