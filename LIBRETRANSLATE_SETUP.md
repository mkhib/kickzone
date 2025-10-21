# LibreTranslate API Setup Guide

## Overview

This application uses **LibreTranslate** - a free, open-source translation API for automatic translation of categories, colors, and other content into multiple languages.

## Why LibreTranslate?

✅ **Completely FREE** - No API keys, no billing, no limits  
✅ **Open Source** - Full transparency and privacy  
✅ **No Sign-Up Required** - Works out of the box  
✅ **Self-Hostable** - Can be deployed on your own servers  
✅ **Multiple Languages** - Supports 20+ languages

## Setup Instructions

### 1. Using Public Instance (Default - No Setup Required!)

The application is configured to use LibreTranslate's free public instance by default. **No configuration needed!**

The public API endpoint is: `https://libretranslate.com/translate`

### 2. Optional: Configure Custom Instance

If you want to use a custom LibreTranslate instance (self-hosted or alternative), add to your `.env` file:

```bash
# .env (optional)
LIBRE_TRANSLATE_URL=https://your-libretranslate-instance.com/translate
API_PORT=4000
```

### 3. Optional: Self-Host LibreTranslate

For maximum privacy and no rate limits, you can self-host LibreTranslate:

#### Using Docker (Easiest)

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

Then update your `.env`:

```bash
LIBRE_TRANSLATE_URL=http://localhost:5000/translate
```

#### Using Python

```bash
pip install libretranslate
libretranslate --host 0.0.0.0 --port 5000
```

#### Using Docker Compose

```yaml
version: '3.8'
services:
  libretranslate:
    image: libretranslate/libretranslate
    restart: unless-stopped
    ports:
      - '5000:5000'
    environment:
      - LT_LOAD_ONLY=en,fa,ar,es,fr,de # Load only the languages you need
```

## How to Use

### Admin Panel - Translation Management

1. Navigate to **Translation Management** in the admin panel
2. Select a category or color
3. Click **"Translate to Other Languages"** button
4. The system will automatically:
   - Detect the English name
   - Translate to Farsi (فارسی), Arabic (العربية), and other languages
   - Save translations to database
   - Mark them as auto-translated

### Supported Languages

LibreTranslate supports many languages including:

- 🇬🇧 English (en) - Source language
- 🇮🇷 Farsi/Persian (fa) - فارسی
- 🇸🇦 Arabic (ar) - العربية
- 🇪🇸 Spanish (es) - Español
- 🇫🇷 French (fr) - Français
- 🇩🇪 German (de) - Deutsch
- 🇨🇳 Chinese (zh) - 中文
- 🇯🇵 Japanese (ja) - 日本語
- 🇰🇷 Korean (ko) - 한국어
- 🇷🇺 Russian (ru) - Русский
- 🇵🇹 Portuguese (pt) - Português
- 🇮🇹 Italian (it) - Italiano
- 🇳🇱 Dutch (nl) - Nederlands
- 🇵🇱 Polish (pl) - Polski
- 🇹🇷 Turkish (tr) - Türkçe

To add more languages, edit:
`libs/client/admins/screens/translation-management/src/lib/AdminTranslationManagement.tsx`

## Limitations of Public Instance

The free public instance has some fair-use limitations:

- Rate limiting during high traffic
- May have occasional downtime
- Shared resources with other users

**Recommendation**: For production use, consider self-hosting LibreTranslate for better reliability and performance.

## Troubleshooting

### Error: "Connection timeout"

- The public instance might be experiencing high traffic
- Try again in a few moments
- Consider self-hosting for guaranteed availability

### Error: "Unsupported language"

- Check that the target language is in the supported list
- LibreTranslate supports 20+ languages, but not all possible languages
- Update the `langMap` in `translation.service.ts` to add language mappings

### Translations not working

- Check the server logs for LibreTranslate API errors
- Verify internet connectivity (if using public instance)
- Test the API manually: `curl -X POST "https://libretranslate.com/translate" -H "Content-Type: application/json" -d '{"q":"Hello","source":"en","target":"fa","format":"text"}'`
- If self-hosting, verify the LibreTranslate service is running

### Translation quality concerns

- LibreTranslate uses Argos Translate models which are good for general text
- For critical translations, consider manual review
- The system marks auto-translations with `isAutoTranslated: true` flag

## Fallback Behavior

If LibreTranslate API fails:

- The system will log an error with full details
- Return a placeholder: `[Farsi] Original Text`
- This allows you to identify untranslated content
- Original text is preserved in the database

## Advantages vs Google Translate

| Feature                 | LibreTranslate                                 | Google Translate                         |
| ----------------------- | ---------------------------------------------- | ---------------------------------------- |
| **Cost**                | Free (unlimited if self-hosted)                | 500k chars/month free, then $20/1M chars |
| **Setup**               | No API key needed                              | Requires Google Cloud account & API key  |
| **Privacy**             | Data stays private (especially if self-hosted) | Data sent to Google servers              |
| **Billing**             | Never                                          | Required even for free tier              |
| **Open Source**         | Yes ✅                                         | No ❌                                    |
| **Self-Hosting**        | Easy with Docker                               | Not possible                             |
| **Translation Quality** | Good                                           | Excellent                                |

## Performance Tips

1. **Self-Host for Production** - More reliable and faster
2. **Load Only Needed Languages** - Reduces memory usage when self-hosting
3. **Cache Translations** - Already implemented in the database
4. **Batch Requests** - The bulk translation API handles this efficiently

## Self-Hosting Resources

- **Official Docker Hub**: https://hub.docker.com/r/libretranslate/libretranslate
- **GitHub Repository**: https://github.com/LibreTranslate/LibreTranslate
- **Documentation**: https://libretranslate.com/docs
- **API Specification**: https://libretranslate.com/docs/#/translate

## Migration from Google Translate

The migration has been completed! Key changes:

1. ✅ Removed `@google-cloud/translate` dependency
2. ✅ Updated `translation.service.ts` to use LibreTranslate
3. ✅ Removed API key requirements
4. ✅ Added support for more languages
5. ✅ No code changes needed - API is fully compatible

All existing translations in the database remain unchanged. New translations will use LibreTranslate automatically.

## Support

For LibreTranslate issues:

- **Documentation**: https://libretranslate.com/docs
- **GitHub Issues**: https://github.com/LibreTranslate/LibreTranslate/issues
- **Community**: https://community.libretranslate.com

For application-specific translation issues, check the server logs in the NestJS console.
