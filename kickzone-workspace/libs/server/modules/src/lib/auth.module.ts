import { AuthController } from '@kickzone-workspace/controllers';
import { AuthService } from '@kickzone-workspace/services';
import { LocalStrategy } from '@kickzone-workspace/strategies';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
