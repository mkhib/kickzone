// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@kickzone-workspace/services';
import { UserModule } from './user.module';
import { LocalStrategy } from '@kickzone-workspace/strategies';
import { AuthController } from '@kickzone-workspace/controllers';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
