import { Module, Global } from '@nestjs/common';
import { TokenService } from '@kickzone-workspace/services';

@Global()
@Module({
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
