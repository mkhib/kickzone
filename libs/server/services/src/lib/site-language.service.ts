import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteLanguage } from '@kickzone-workspace/entities';
import {
  CreateSiteLanguageInput,
  UpdateSiteLanguageInput,
} from '@kickzone-workspace/inputs';

export const BASIC_LANGUAGES: Array<{
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
  isActive: boolean;
  isDefault: boolean;
}> = [
  {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    isRTL: true,
    isActive: true,
    isDefault: true,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isRTL: false,
    isActive: true,
    isDefault: false,
  },
];

@Injectable()
export class SiteLanguageService implements OnModuleInit {
  private readonly logger = new Logger(SiteLanguageService.name);

  constructor(
    @InjectRepository(SiteLanguage)
    private readonly siteLanguageRepository: Repository<SiteLanguage>
  ) {}

  async onModuleInit() {
    await this.seedBasicLanguages();
  }

  async seedBasicLanguages(): Promise<void> {
    for (const basic of BASIC_LANGUAGES) {
      const existing = await this.siteLanguageRepository.findOne({
        where: { code: basic.code },
      });
      if (!existing) {
        await this.siteLanguageRepository.save(
          this.siteLanguageRepository.create(basic)
        );
        this.logger.log(`Seeded site language: ${basic.name} (${basic.code})`);
      }
    }
  }

  async findAll(activeOnly = false): Promise<SiteLanguage[]> {
    if (activeOnly) {
      return this.siteLanguageRepository.find({
        where: { isActive: true },
        order: { isDefault: 'DESC', id: 'ASC' },
      });
    }
    return this.siteLanguageRepository.find({
      order: { isDefault: 'DESC', id: 'ASC' },
    });
  }

  async findByCode(code: string): Promise<SiteLanguage | null> {
    return this.siteLanguageRepository.findOne({
      where: { code },
    });
  }

  async findById(id: number): Promise<SiteLanguage | null> {
    return this.siteLanguageRepository.findOne({
      where: { id },
    });
  }

  async getDefaultLanguage(): Promise<SiteLanguage | null> {
    const defaultLang = await this.siteLanguageRepository.findOne({
      where: { isDefault: true, isActive: true },
    });
    if (defaultLang) return defaultLang;
    // Fallback to first active language
    return this.siteLanguageRepository.findOne({
      where: { isActive: true },
      order: { id: 'ASC' },
    });
  }

  async create(input: CreateSiteLanguageInput): Promise<SiteLanguage> {
    const code = input.code.trim().toLowerCase();
    const existing = await this.findByCode(code);
    if (existing) {
      throw new BadRequestException(
        `Language with code "${code}" already exists.`
      );
    }

    if (input.isDefault) {
      // Unset previous default
      await this.siteLanguageRepository.update(
        { isDefault: true },
        { isDefault: false }
      );
    }

    const language = this.siteLanguageRepository.create({
      code,
      name: input.name.trim(),
      nativeName: input.nativeName.trim(),
      isRTL: input.isRTL ?? false,
      isActive: input.isActive ?? true,
      isDefault: input.isDefault ?? false,
    });

    return this.siteLanguageRepository.save(language);
  }

  async update(
    id: number,
    input: UpdateSiteLanguageInput
  ): Promise<SiteLanguage> {
    const language = await this.findById(id);
    if (!language) {
      throw new NotFoundException(`SiteLanguage with ID ${id} not found.`);
    }

    if (input.isDefault) {
      await this.siteLanguageRepository.update(
        { isDefault: true },
        { isDefault: false }
      );
    }

    if (input.name !== undefined) language.name = input.name.trim();
    if (input.nativeName !== undefined)
      language.nativeName = input.nativeName.trim();
    if (input.isRTL !== undefined) language.isRTL = input.isRTL;
    if (input.isActive !== undefined) language.isActive = input.isActive;
    if (input.isDefault !== undefined) language.isDefault = input.isDefault;

    return this.siteLanguageRepository.save(language);
  }

  async delete(id: number): Promise<boolean> {
    const language = await this.findById(id);
    if (!language) {
      throw new NotFoundException(`SiteLanguage with ID ${id} not found.`);
    }
    if (language.isDefault) {
      throw new BadRequestException('Cannot delete default site language.');
    }
    await this.siteLanguageRepository.delete(id);
    return true;
  }
}
