import { AuthController } from '@kickzone-workspace/controllers';
import { AuthService } from '@kickzone-workspace/services';
import { LocalStrategy } from '@kickzone-workspace/strategies';
import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '@kickzone-workspace/resolvers';
import { EmailModule } from './email.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    EmailModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
