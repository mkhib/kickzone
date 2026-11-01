import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Translation } from '@kickzone-workspace/entities';
import axios from 'axios';

export interface TranslationInput {
  entityType: string;
  entityId: number;
  locale: string;
  fieldName: string;
  value: string;
  isAutoTranslated?: boolean;
  translatedBy?: number;
}

export interface BulkTranslationInput {
  entityType: string;
  entityIds: number[];
  sourceLocale: string;
  targetLocales: string[];
}

/** Request body for the LibreTranslate /translate endpoint. */
interface LibreTranslateRequestBody {
  q: string;
  source: string;
  target: string;
  format?: 'text' | 'html';
  api_key?: string;
}

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private readonly translateApiUrl: string;

  private readonly apiKey: string | undefined;

  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>
  ) {
    // Use LibreTranslate - free and open source translation API
    // You can use the public instance or self-host your own
    this.translateApiUrl =
      process.env['LIBRE_TRANSLATE_URL'] ||
      'https://libretranslate.com/translate';

    // API key is optional (only needed for public LibreTranslate instance)
    this.apiKey = process.env['LIBRE_TRANSLATE_API_KEY'];

    this.logger.log('🌍 LibreTranslate configured');
    this.logger.log(`📡 API URL: ${this.translateApiUrl}`);

    if (this.apiKey) {
      this.logger.log('🔑 API key configured');
    } else {
      this.logger.warn('⚠️  No API key - translations may fail');
      this.logger.warn(
        '💡 Get API key from: https://portal.libretranslate.com'
      );
      this.logger.log(
        '💡 OR self-host: docker run -ti --rm -p 5000:5000 libretranslate/libretranslate'
      );
    }
  }

  /**
   * Get translation with fallback support
   */
  async getTranslation(
    entityType: string,
    entityId: number,
    locale: string,
    fieldName: string,
    fallback?: string
  ): Promise<string> {
    try {
      const translation = await this.translationRepository.findOne({
        where: { entityType, entityId, locale, fieldName },
      });

      return translation?.value || fallback || '';
    } catch (error) {
      this.logger.error(
        `Failed to get translation: ${entityType}:${entityId}:${locale}:${fieldName}`,
        error
      );
      return fallback || '';
    }
  }

  /**
   * Get multiple translations at once for performance
   */
  async getTranslations(
    entityType: string,
    entityIds: number[],
    locale: string,
    fieldName: string
  ): Promise<Map<number, string>> {
    try {
      const translations = await this.translationRepository.find({
        where: {
          entityType,
          entityId: In(entityIds),
          locale,
          fieldName,
        },
      });

      const result = new Map<number, string>();
      translations.forEach((t) => result.set(t.entityId, t.value));

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to get translations: ${entityType}:${entityIds}:${locale}:${fieldName}`,
        error
      );
      return new Map();
    }
  }

  /**
   * Set translation (upsert operation)
   */
  async setTranslation(input: TranslationInput): Promise<Translation> {
    try {
      const existing = await this.translationRepository.findOne({
        where: {
          entityType: input.entityType,
          entityId: input.entityId,
          locale: input.locale,
          fieldName: input.fieldName,
        },
      });

      if (existing) {
        existing.value = input.value;
        existing.isAutoTranslated = input.isAutoTranslated || false;
        existing.translatedBy = input.translatedBy;
        return this.translationRepository.save(existing);
      }

      return this.translationRepository.save({
        entityType: input.entityType,
        entityId: input.entityId,
        locale: input.locale,
        fieldName: input.fieldName,
        value: input.value,
        isAutoTranslated: input.isAutoTranslated || false,
        translatedBy: input.translatedBy,
      });
    } catch (error) {
      this.logger.error(
        `Failed to set translation: ${input.entityType}:${input.entityId}:${input.locale}:${input.fieldName}`,
        error
      );
      throw error;
    }
  }

  /**
   * Bulk translate entities to multiple languages
   */
  async bulkTranslateEntities(input: BulkTranslationInput): Promise<void> {
    try {
      this.logger.log('═══════════════════════════════════════════════');
      this.logger.log('🌍 BULK TRANSLATION STARTED');
      this.logger.log(`📦 Entity Type: ${input.entityType}`);
      this.logger.log(`🆔 Entity IDs: [${input.entityIds.join(', ')}]`);
      this.logger.log(`🔤 Source Locale: ${input.sourceLocale}`);
      this.logger.log(`🎯 Target Locales: [${input.targetLocales.join(', ')}]`);
      this.logger.log('═══════════════════════════════════════════════');

      // Get source translations
      const sourceTranslations = await this.translationRepository.find({
        where: {
          entityType: input.entityType,
          entityId: In(input.entityIds),
          locale: input.sourceLocale,
        },
      });

      this.logger.log(
        `✅ Found ${sourceTranslations.length} source translations for ${
          input.entityType
        } entities ${input.entityIds.join(', ')} in locale ${
          input.sourceLocale
        }`
      );

      if (sourceTranslations.length === 0) {
        this.logger.warn(
          `No source translations found for ${
            input.entityType
          } entities ${input.entityIds.join(', ')} in locale ${
            input.sourceLocale
          }`
        );
        return;
      }

      // Group by entity ID for batch processing
      const translationsByEntity = new Map<number, Translation[]>();
      sourceTranslations.forEach((t) => {
        if (!translationsByEntity.has(t.entityId)) {
          translationsByEntity.set(t.entityId, []);
        }
        const entityTranslations = translationsByEntity.get(t.entityId);
        if (entityTranslations) {
          entityTranslations.push(t);
        }
      });

      // Process each entity
      let successCount = 0;
      let skipCount = 0;
      let errorCount = 0;

      for (const [entityId, translations] of translationsByEntity) {
        this.logger.log(`\n📝 Processing Entity ID: ${entityId}`);

        for (const sourceTranslation of translations) {
          this.logger.log(
            `  📄 Field: ${sourceTranslation.fieldName} = "${sourceTranslation.value}"`
          );

          for (const targetLocale of input.targetLocales) {
            // Check if translation already exists
            const exists = await this.translationRepository.findOne({
              where: {
                entityType: input.entityType,
                entityId,
                locale: targetLocale,
                fieldName: sourceTranslation.fieldName,
              },
            });

            // Skip if translation exists AND is not a placeholder from failed translation
            const isPlaceholder =
              exists &&
              (exists.value.startsWith('[') ||
                exists.value.includes('[فارسی]') ||
                exists.value.includes('[العربية]'));

            if (exists && !isPlaceholder) {
              this.logger.log(
                `    ⏭️  Skipping ${targetLocale}: Translation already exists`
              );
              skipCount++;
              continue;
            }

            if (isPlaceholder) {
              this.logger.log(
                `    🔄 Replacing placeholder translation in ${targetLocale}...`
              );
            }

            try {
              this.logger.log(`    🔄 Translating to ${targetLocale}...`);

              const translatedValue = await this.autoTranslate(
                sourceTranslation.value,
                targetLocale
              );

              await this.setTranslation({
                entityType: input.entityType,
                entityId,
                locale: targetLocale,
                fieldName: sourceTranslation.fieldName,
                value: translatedValue,
                isAutoTranslated: true,
              });

              this.logger.log(
                `    ✅ SUCCESS: "${sourceTranslation.value}" → "${translatedValue}" (${targetLocale})`
              );
              successCount++;
            } catch (error) {
              this.logger.error(
                `    ❌ FAILED: ${input.entityType}:${entityId}:${sourceTranslation.fieldName} to ${targetLocale}`,
                error
              );
              errorCount++;
            }
          }
        }
      }

      this.logger.log('\n═══════════════════════════════════════════════');
      this.logger.log('📊 BULK TRANSLATION SUMMARY');
      this.logger.log(`✅ Successful: ${successCount}`);
      this.logger.log(`⏭️  Skipped (already exist): ${skipCount}`);
      this.logger.log(`❌ Failed: ${errorCount}`);
      this.logger.log('═══════════════════════════════════════════════\n');
    } catch (error) {
      this.logger.error('Bulk translation failed', error);
      throw error;
    }
  }

  /**
   * Get all translations for an entity
   */
  async getEntityTranslations(
    entityType: string,
    entityId: number
  ): Promise<Map<string, Map<string, string>>> {
    try {
      const translations = await this.translationRepository.find({
        where: { entityType, entityId },
      });

      const result = new Map<string, Map<string, string>>();

      translations.forEach((t) => {
        if (!result.has(t.fieldName)) {
          result.set(t.fieldName, new Map());
        }
        const fieldMap = result.get(t.fieldName);
        if (fieldMap) {
          fieldMap.set(t.locale, t.value);
        }
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to get entity translations: ${entityType}:${entityId}`,
        error
      );
      return new Map();
    }
  }

  /**
   * Delete translations for an entity
   */
  async deleteEntityTranslations(
    entityType: string,
    entityId: number
  ): Promise<void> {
    try {
      await this.translationRepository.delete({
        entityType,
        entityId,
      });
    } catch (error) {
      this.logger.error(
        `Failed to delete entity translations: ${entityType}:${entityId}`,
        error
      );
      throw error;
    }
  }

  /**
   * Get translation statistics
   */
  async getTranslationStats(entityType: string): Promise<{
    totalEntities: number;
    translatedEntities: number;
    locales: string[];
    fieldNames: string[];
  }> {
    try {
      const translations = await this.translationRepository.find({
        where: { entityType },
      });

      const entityIds = new Set(translations.map((t) => t.entityId));
      const locales = new Set(translations.map((t) => t.locale));
      const fieldNames = new Set(translations.map((t) => t.fieldName));

      return {
        totalEntities: entityIds.size,
        translatedEntities: entityIds.size,
        locales: Array.from(locales),
        fieldNames: Array.from(fieldNames),
      };
    } catch (error) {
      this.logger.error(
        `Failed to get translation stats: ${entityType}`,
        error
      );
      return {
        totalEntities: 0,
        translatedEntities: 0,
        locales: [],
        fieldNames: [],
      };
    }
  }

  /**
   * Auto-translate text using LibreTranslate API (free and open source)
   */
  private async autoTranslate(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    const startTime = Date.now();

    try {
      // Map locale codes to LibreTranslate language codes
      const langMap: Record<string, string> = {
        en: 'en',
        fa: 'fa', // Persian/Farsi
        ar: 'ar', // Arabic
        es: 'es',
        fr: 'fr',
        de: 'de',
        zh: 'zh',
        ja: 'ja',
        ko: 'ko',
        ru: 'ru',
        pt: 'pt',
        it: 'it',
        nl: 'nl',
        pl: 'pl',
        tr: 'tr',
      };

      const targetLang = langMap[targetLanguage] || targetLanguage;

      this.logger.log(
        `🔄 Calling LibreTranslate API: "${text}" → ${targetLang}`
      );

      // Prepare request body
      const requestBody: LibreTranslateRequestBody = {
        q: text,
        source: 'en', // Assuming source is always English
        target: targetLang,
        format: 'text',
      };

      // Add API key if available
      if (this.apiKey) {
        requestBody.api_key = this.apiKey;
      }

      // Call LibreTranslate API
      const response = await axios.post(this.translateApiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      const translatedText = response.data.translatedText;
      const duration = Date.now() - startTime;

      this.logger.log(
        `✅ LibreTranslate Response (${duration}ms): "${translatedText}"`
      );

      return translatedText;
    } catch (error) {
      const duration = Date.now() - startTime;

      this.logger.error('═══════════════════════════════════════════════');
      this.logger.error('❌ LIBRETRANSLATE API ERROR');
      this.logger.error(`Duration: ${duration}ms`);
      this.logger.error(`Target Language: ${targetLanguage}`);
      this.logger.error(`Text: "${text}"`);

      if (axios.isAxiosError(error)) {
        this.logger.error(`Status: ${error.response?.status}`);
        this.logger.error(`Response: ${JSON.stringify(error.response?.data)}`);
        this.logger.error(`Message: ${error.message}`);
      } else if (error instanceof Error) {
        this.logger.error(`Error Message: ${error.message}`);
        this.logger.error(`Error Name: ${error.name}`);
        if (error.stack) {
          this.logger.error(`Stack: ${error.stack.split('\n')[0]}`);
        }
      }

      this.logger.error('═══════════════════════════════════════════════');

      // Fallback: return original text with language indicator
      const languageNames: Record<string, string> = {
        en: 'English',
        fa: 'فارسی',
        ar: 'العربية',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        zh: '中文',
        ja: '日本語',
        ko: '한국어',
        ru: 'Русский',
      };

      const languageName =
        languageNames[targetLanguage] || targetLanguage.toUpperCase();

      const fallbackText = `[${languageName}] ${text}`;
      this.logger.warn(`⚠️  Using fallback text: "${fallbackText}"`);

      return fallbackText;
    }
  }

  /**
   * Validate translation input
   */
  private validateTranslationInput(input: TranslationInput): void {
    if (
      !input.entityType ||
      !input.entityId ||
      !input.locale ||
      !input.fieldName ||
      !input.value
    ) {
      throw new Error('Invalid translation input: missing required fields');
    }

    if (input.value.length > 10000) {
      throw new Error('Translation value too long (max 10000 characters)');
    }
  }
}
