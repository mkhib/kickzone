import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, SetMetadata } from '@nestjs/common';
import { SiteLanguage, UserRole } from '@kickzone-workspace/entities';
import { SiteLanguageService } from '@kickzone-workspace/services';
import { RolesGuard } from '@kickzone-workspace/guards';
import {
  CreateSiteLanguageInput,
  UpdateSiteLanguageInput,
} from '@kickzone-workspace/inputs';

@Resolver(() => SiteLanguage)
export class SiteLanguageResolver {
  constructor(private readonly siteLanguageService: SiteLanguageService) {}

  @Query(() => [SiteLanguage])
  async siteLanguages(
    @Args('activeOnly', { type: () => Boolean, nullable: true })
    activeOnly?: boolean
  ): Promise<SiteLanguage[]> {
    return this.siteLanguageService.findAll(activeOnly ?? true);
  }

  @Query(() => SiteLanguage, { nullable: true })
  async siteLanguage(
    @Args('code') code: string
  ): Promise<SiteLanguage | null> {
    return this.siteLanguageService.findByCode(code);
  }

  @Mutation(() => SiteLanguage)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createSiteLanguage(
    @Args('input') input: CreateSiteLanguageInput
  ): Promise<SiteLanguage> {
    return this.siteLanguageService.create(input);
  }

  @Mutation(() => SiteLanguage)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateSiteLanguage(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateSiteLanguageInput
  ): Promise<SiteLanguage> {
    return this.siteLanguageService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async deleteSiteLanguage(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.siteLanguageService.delete(id);
  }
}
