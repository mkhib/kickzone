import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from '@kickzone-workspace/entities';
import { ColorService } from '@kickzone-workspace/services';
import { ColorResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService, ColorResolver],
  exports: [ColorService, TypeOrmModule.forFeature([Color])],
})
export class ColorModule {}
