import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Float,
  InputType,
  Field,
} from '@nestjs/graphql';
import { UseGuards, SetMetadata } from '@nestjs/common';
import {
  Currency,
  ExchangeRate,
  CurrencyPreference,
  UserRole,
  User,
} from '@kickzone-workspace/entities';
import { CurrencyService } from '@kickzone-workspace/services';
import { RolesGuard } from '@kickzone-workspace/guards';
import { CurrentUser } from '@kickzone-workspace/decorators';
import {
  currencyCodeSchema,
  createCurrencySchema,
  languageCodeSchema,
  setExchangeRateSchema,
  updateCurrencySchema,
} from '@kickzone-workspace/validation';
import { ZodValidationPipe } from './zod-validation.pipe';

// =============== Input Types ===============

@InputType()
export class CreateCurrencyInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field(() => Int)
  decimalPlaces: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isBaseCurrency?: boolean;
}

@InputType()
export class UpdateCurrencyInput {
  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  symbol?: string;

  @Field(() => Int, { nullable: true })
  decimalPlaces?: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isBaseCurrency?: boolean;
}

@InputType()
export class SetExchangeRateInput {
  @Field()
  fromCurrencyCode: string;

  @Field()
  toCurrencyCode: string;

  @Field(() => Float)
  rate: number;

  @Field({ nullable: true })
  effectiveDate?: Date;

  @Field({ nullable: true })
  notes?: string;
}

// =============== Resolver ===============

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  // =============== Queries (Public/Protected) ===============

  @Query(() => [Currency])
  async currencies(): Promise<Currency[]> {
    return this.currencyService.findAllCurrencies();
  }

  @Query(() => Currency, { nullable: true })
  async currency(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Currency | null> {
    return this.currencyService.findCurrencyById(id);
  }

  @Query(() => Currency, { nullable: true })
  async currencyByCode(@Args('code') code: string): Promise<Currency | null> {
    return this.currencyService.findCurrencyByCode(code);
  }

  @Query(() => ExchangeRate, { nullable: true })
  async currentExchangeRate(
    @Args('fromCurrencyCode') fromCurrencyCode: string,
    @Args('toCurrencyCode') toCurrencyCode: string
  ): Promise<ExchangeRate | null> {
    return this.currencyService.getCurrentExchangeRate(
      fromCurrencyCode,
      toCurrencyCode
    );
  }

  @Query(() => [ExchangeRate])
  async exchangeRateHistory(
    @Args('fromCurrencyCode') fromCurrencyCode: string,
    @Args('toCurrencyCode') toCurrencyCode: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number
  ): Promise<ExchangeRate[]> {
    return this.currencyService.getExchangeRateHistory(
      fromCurrencyCode,
      toCurrencyCode,
      limit || 10
    );
  }

  @Query(() => [CurrencyPreference])
  async currencyPreferences(): Promise<CurrencyPreference[]> {
    return this.currencyService.findAllCurrencyPreferences();
  }

  @Query(() => CurrencyPreference, { nullable: true })
  async currencyPreferenceByLocale(
    @Args('locale') locale: string
  ): Promise<CurrencyPreference | null> {
    return this.currencyService.findCurrencyPreferenceByLocale(locale);
  }

  // =============== Mutations (Admin Only) ===============

  @Mutation(() => Currency)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createCurrency(
    @Args('input', new ZodValidationPipe(createCurrencySchema))
    input: CreateCurrencyInput
  ): Promise<Currency> {
    return this.currencyService.createCurrency(input);
  }

  @Mutation(() => Currency)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateCurrency(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', new ZodValidationPipe(updateCurrencySchema))
    input: UpdateCurrencyInput
  ): Promise<Currency> {
    return this.currencyService.updateCurrency(id, input);
  }

  @Mutation(() => ExchangeRate)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async setExchangeRate(
    @Args('input', new ZodValidationPipe(setExchangeRateSchema))
    input: SetExchangeRateInput,
    @CurrentUser() user?: User
  ): Promise<ExchangeRate> {
    return this.currencyService.setExchangeRate({
      ...input,
      createdById: user?.id,
    });
  }

  @Mutation(() => CurrencyPreference)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async setCurrencyPreference(
    @Args('locale', new ZodValidationPipe(languageCodeSchema)) locale: string,
    @Args('currencyCode', new ZodValidationPipe(currencyCodeSchema))
    currencyCode: string
  ): Promise<CurrencyPreference> {
    return this.currencyService.setCurrencyPreference(locale, currencyCode);
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async deleteCurrencyPreference(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.currencyService.deleteCurrencyPreference(id);
  }
}
