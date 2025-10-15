import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import {
  Currency,
  ExchangeRate,
  CurrencyPreference,
} from '@kickzone-workspace/entities';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
    @InjectRepository(CurrencyPreference)
    private currencyPreferenceRepository: Repository<CurrencyPreference>
  ) {}

  // =============== Currency Management ===============

  async findAllCurrencies(): Promise<Currency[]> {
    return this.currencyRepository.find({
      order: { isBaseCurrency: 'DESC', code: 'ASC' },
    });
  }

  async findCurrencyById(id: number): Promise<Currency | null> {
    return this.currencyRepository.findOne({ where: { id } });
  }

  async findCurrencyByCode(code: string): Promise<Currency | null> {
    return this.currencyRepository.findOne({
      where: { code: code.toUpperCase() },
    });
  }

  async createCurrency(data: {
    code: string;
    name: string;
    symbol: string;
    decimalPlaces: number;
    isActive?: boolean;
    isBaseCurrency?: boolean;
  }): Promise<Currency> {
    // If setting as base currency, unset all others
    if (data.isBaseCurrency) {
      await this.currencyRepository.update(
        { isBaseCurrency: true },
        { isBaseCurrency: false }
      );
    }

    const currency = this.currencyRepository.create({
      ...data,
      code: data.code.toUpperCase(),
    });

    return this.currencyRepository.save(currency);
  }

  async updateCurrency(
    id: number,
    data: {
      code?: string;
      name?: string;
      symbol?: string;
      decimalPlaces?: number;
      isActive?: boolean;
      isBaseCurrency?: boolean;
    }
  ): Promise<Currency> {
    const currency = await this.findCurrencyById(id);
    if (!currency) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }

    // If setting as base currency, unset all others
    if (data.isBaseCurrency && !currency.isBaseCurrency) {
      await this.currencyRepository.update(
        { isBaseCurrency: true },
        { isBaseCurrency: false }
      );
    }

    Object.assign(currency, {
      ...data,
      code: data.code ? data.code.toUpperCase() : currency.code,
    });

    return this.currencyRepository.save(currency);
  }

  async getBaseCurrency(): Promise<Currency> {
    const baseCurrency = await this.currencyRepository.findOne({
      where: { isBaseCurrency: true, isActive: true },
    });

    if (!baseCurrency) {
      throw new NotFoundException('No base currency configured');
    }

    return baseCurrency;
  }

  // =============== Exchange Rate Management ===============

  async setExchangeRate(data: {
    fromCurrencyCode: string;
    toCurrencyCode: string;
    rate: number;
    effectiveDate?: Date;
    notes?: string;
    createdById?: string;
  }): Promise<ExchangeRate> {
    const fromCurrency = await this.findCurrencyByCode(data.fromCurrencyCode);
    const toCurrency = await this.findCurrencyByCode(data.toCurrencyCode);

    if (!fromCurrency) {
      throw new NotFoundException(
        `Currency ${data.fromCurrencyCode} not found`
      );
    }
    if (!toCurrency) {
      throw new NotFoundException(`Currency ${data.toCurrencyCode} not found`);
    }

    if (data.rate <= 0) {
      throw new BadRequestException('Exchange rate must be greater than 0');
    }

    const exchangeRate = this.exchangeRateRepository.create({
      fromCurrencyId: fromCurrency.id,
      toCurrencyId: toCurrency.id,
      rate: data.rate,
      effectiveDate: data.effectiveDate || new Date(),
      notes: data.notes,
      createdById: data.createdById,
    });

    const saved = await this.exchangeRateRepository.save(exchangeRate);

    // Reload with relations to satisfy GraphQL schema
    return this.exchangeRateRepository.findOne({
      where: { id: saved.id },
      relations: ['fromCurrency', 'toCurrency', 'createdBy'],
    }) as Promise<ExchangeRate>;
  }

  async getCurrentExchangeRate(
    fromCurrencyCode: string,
    toCurrencyCode: string
  ): Promise<ExchangeRate | null> {
    const fromCurrency = await this.findCurrencyByCode(fromCurrencyCode);
    const toCurrency = await this.findCurrencyByCode(toCurrencyCode);

    if (!fromCurrency || !toCurrency) {
      return null;
    }

    // If same currency, return rate of 1
    if (fromCurrency.id === toCurrency.id) {
      return this.exchangeRateRepository.create({
        fromCurrencyId: fromCurrency.id,
        toCurrencyId: toCurrency.id,
        rate: 1,
        effectiveDate: new Date(),
        id: 0,
      });
    }

    const exchangeRate = await this.exchangeRateRepository.findOne({
      where: {
        fromCurrencyId: fromCurrency.id,
        toCurrencyId: toCurrency.id,
        effectiveDate: LessThanOrEqual(new Date()),
      },
      order: { effectiveDate: 'DESC' },
      relations: ['fromCurrency', 'toCurrency', 'createdBy'],
    });

    return exchangeRate;
  }

  async getExchangeRateHistory(
    fromCurrencyCode: string,
    toCurrencyCode: string,
    limit = 10
  ): Promise<ExchangeRate[]> {
    const fromCurrency = await this.findCurrencyByCode(fromCurrencyCode);
    const toCurrency = await this.findCurrencyByCode(toCurrencyCode);

    if (!fromCurrency || !toCurrency) {
      return [];
    }

    return this.exchangeRateRepository.find({
      where: {
        fromCurrencyId: fromCurrency.id,
        toCurrencyId: toCurrency.id,
      },
      order: { effectiveDate: 'DESC' },
      take: limit,
      relations: ['fromCurrency', 'toCurrency', 'createdBy'],
    });
  }

  async convertPrice(
    amount: number,
    fromCurrencyCode: string,
    toCurrencyCode: string
  ): Promise<{ amount: number; rate: number }> {
    const exchangeRate = await this.getCurrentExchangeRate(
      fromCurrencyCode,
      toCurrencyCode
    );

    if (!exchangeRate) {
      throw new NotFoundException(
        `No exchange rate found from ${fromCurrencyCode} to ${toCurrencyCode}`
      );
    }

    const convertedAmount = amount * exchangeRate.rate;
    const toCurrency = await this.findCurrencyByCode(toCurrencyCode);

    // Round based on decimal places
    const rounded = toCurrency
      ? Number(convertedAmount.toFixed(toCurrency.decimalPlaces))
      : convertedAmount;

    return {
      amount: rounded,
      rate: exchangeRate.rate,
    };
  }

  // =============== Currency Preference Management ===============

  async findAllCurrencyPreferences(): Promise<CurrencyPreference[]> {
    return this.currencyPreferenceRepository.find({
      relations: ['currency'],
      order: { locale: 'ASC' },
    });
  }

  async findCurrencyPreferenceByLocale(
    locale: string
  ): Promise<CurrencyPreference | null> {
    return this.currencyPreferenceRepository.findOne({
      where: { locale },
      relations: ['currency'],
    });
  }

  async setCurrencyPreference(
    locale: string,
    currencyCode: string
  ): Promise<CurrencyPreference> {
    const currency = await this.findCurrencyByCode(currencyCode);
    if (!currency) {
      throw new NotFoundException(`Currency ${currencyCode} not found`);
    }

    let preference = await this.findCurrencyPreferenceByLocale(locale);

    if (preference) {
      preference.currencyId = currency.id;
      preference.currency = currency;
    } else {
      preference = this.currencyPreferenceRepository.create({
        locale,
        currencyId: currency.id,
        currency,
      });
    }

    return this.currencyPreferenceRepository.save(preference);
  }

  async deleteCurrencyPreference(id: number): Promise<boolean> {
    const result = await this.currencyPreferenceRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async getCurrencyForLocale(locale: string): Promise<Currency | null> {
    const preference = await this.findCurrencyPreferenceByLocale(locale);
    return preference ? preference.currency : null;
  }
}
