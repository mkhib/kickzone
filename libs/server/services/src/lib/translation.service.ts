import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Translation } from '@kickzone-workspace/entities';

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

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);

  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>
  ) {}

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
      // Get source translations
      const sourceTranslations = await this.translationRepository.find({
        where: {
          entityType: input.entityType,
          entityId: In(input.entityIds),
          locale: input.sourceLocale,
        },
      });

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
      for (const [entityId, translations] of translationsByEntity) {
        for (const sourceTranslation of translations) {
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

            if (!exists) {
              try {
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
                  `Auto-translated ${input.entityType}:${entityId}:${sourceTranslation.fieldName} to ${targetLocale}`
                );
              } catch (error) {
                this.logger.error(
                  `Failed to translate ${input.entityType}:${entityId}:${sourceTranslation.fieldName} to ${targetLocale}`,
                  error
                );
              }
            }
          }
        }
      }
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
   * Auto-translate text using external service
   * TODO: Integrate with Google Translate API, DeepL, or similar
   */
  private async autoTranslate(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    // For now, return a placeholder with language code
    // In production, integrate with translation API
    const languageNames: Record<string, string> = {
      en: 'English',
      fa: 'Farsi',
      ar: 'Arabic',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      zh: 'Chinese',
      ja: 'Japanese',
      ko: 'Korean',
      ru: 'Russian',
    };

    const languageName =
      languageNames[targetLanguage] || targetLanguage.toUpperCase();
    return `[${languageName}] ${text}`;
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
