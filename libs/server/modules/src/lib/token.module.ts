import { Module } from '@nestjs/common';
import { TokenService } from '@kickzone-workspace/services';

@Module({
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
