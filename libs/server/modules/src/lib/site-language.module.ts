import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteLanguage } from '@kickzone-workspace/entities';
import { SiteLanguageService } from '@kickzone-workspace/services';
import { SiteLanguageResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([SiteLanguage])],
  providers: [SiteLanguageService, SiteLanguageResolver],
  exports: [SiteLanguageService, TypeOrmModule],
})
export class SiteLanguageModule {}
