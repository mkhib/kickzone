import { Module } from '@nestjs/common';
import { AuthService } from '@kickzone-workspace/services';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class GraphqlContextModule {}
