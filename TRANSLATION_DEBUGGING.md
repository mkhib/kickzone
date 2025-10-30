# Translation System Debugging Guide

## Issue: LibreTranslate API Not Working

### Step 1: Check Configuration (Optional)

LibreTranslate works **without any configuration** by default! It uses the free public instance at `https://libretranslate.com/translate`.

**Optional**: If you want to use a custom instance, add to `.env` file in project root:

```bash
# Option 1: Add API key for public LibreTranslate instance
LIBRE_TRANSLATE_API_KEY=your_api_key_here

# Option 2: Use self-hosted LibreTranslate instance (no API key needed)
LIBRE_TRANSLATE_URL=http://localhost:5000/translate
```

⚠️ **Note**: The `.env` file must be in the **root directory** (same level as `package.json`), NOT in `apps/kickzone-api/`

💡 **Recommended**: Use self-hosted instance for development (no API key needed):

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

### Step 2: Restart the API Server

After changing the `.env` file (if using custom instance):

```bash
# Kill the running server (Ctrl+C)
# Then restart:
nx serve kickzone-api
```

### Step 3: Check Server Logs

When you click "Translate to Other Languages" in the admin panel, check the server console for:

**✅ Success logs:**

```
[TranslationService] 🔄 Calling LibreTranslate API: "Shoe" → fa
[TranslationService] ✅ LibreTranslate Response (234ms): "کفش"
```

**❌ Error patterns and solutions:**

#### Error 1: "Connection timeout"

```
❌ LIBRETRANSLATE API ERROR
Message: timeout of 10000ms exceeded
```

**Solution:**

- The public instance might be experiencing high traffic
- Try again in a few moments
- Consider self-hosting LibreTranslate for better reliability:
  ```bash
  docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
  ```
  Then set `LIBRE_TRANSLATE_URL=http://localhost:5000/translate` in `.env`

#### Error 2: "Network Error"

```
❌ LIBRETRANSLATE API ERROR
Message: Network Error
```

**Solution:**

- Check your internet connection
- Verify you can access https://libretranslate.com in browser
- If using self-hosted instance, verify it's running

#### Error 3: "Unsupported language pair"

```
Response: {"error": "Unsupported language pair"}
```

**Solution:**

- The requested language might not be supported
- Check supported languages at: https://libretranslate.com
- Update the `langMap` in `translation.service.ts` if needed

#### Error 4: "Rate limit exceeded"

```
Status: 429
Response: {"error": "Too Many Requests"}
```

**Solution:**

- The public instance has rate limiting
- Wait a few minutes before trying again
- Self-host LibreTranslate for unlimited requests:
  ```bash
  docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
  ```

#### Error 5: "API key required"

```
Status: 400
Response: {"error":"Visit https://portal.libretranslate.com to get an API key"}
```

**Solution (Choose ONE):**

**Option A: Get API Key (Recommended for production)**

1. Visit https://portal.libretranslate.com
2. Create a free account and get your API key
3. Add to `.env` file in project root:
   ```bash
   LIBRE_TRANSLATE_API_KEY=your_api_key_here
   ```
4. Restart the API server

**Option B: Self-Host LibreTranslate (Recommended for development)**

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

Then set in `.env`:

```bash
LIBRE_TRANSLATE_URL=http://localhost:5000/translate
```

Self-hosted instances don't require an API key.

#### Error 6: "Bad request"

```
Status: 400
Response: {"error": "Invalid request"}
```

**Solution:**

- Check that the text to translate is not empty
- Verify the source and target language codes are valid
- Check server logs for more details

### Step 4: Test with Curl

Test LibreTranslate API directly:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "q": "Hello",
    "source": "en",
    "target": "fa",
    "format": "text"
  }' \
  "https://libretranslate.com/translate"
```

**Expected response:**

```json
{
  "translatedText": "سلام"
}
```

### Step 5: Check Database

Verify translations are being saved:

```sql
-- Check if translations table exists
SELECT * FROM translation LIMIT 10;

-- Check translations for a specific category (e.g., id=1)
SELECT * FROM translation
WHERE entity_type = 'category'
AND entity_id = 1;

-- Check auto-translated items
SELECT * FROM translation
WHERE is_auto_translated = true;
```

### Step 6: Verify Configuration Loading

Check the server startup logs for LibreTranslate configuration:

**Server console on startup:**

```
[TranslationService] 🌍 LibreTranslate configured
[TranslationService] 📡 API URL: https://libretranslate.com/translate
[TranslationService] ✅ No API key required - using free public instance
[TranslationService] 💡 To self-host: docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

This confirms LibreTranslate is configured correctly.

---

## Issue: Translations Require Page Refresh

This issue is **now fixed** with the latest update. If you still see it:

### Clear Browser Cache

```
Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### Clear Apollo Cache Manually

Add this to your admin panel temporarily:

```typescript
import { useApolloClient } from '@apollo/client';

function DebugButton() {
  const client = useApolloClient();

  return <Button onClick={() => client.resetStore()}>Reset Apollo Cache</Button>;
}
```

---

## Quick Test Checklist

Before testing translations:

- [ ] ✅ Server is running (no configuration needed!)
- [ ] ✅ Internet connection is active (for public instance)
- [ ] ✅ Category has an English translation saved first
- [ ] ✅ Checked server logs for LibreTranslate configuration message
- [ ] ✅ Can access https://libretranslate.com in browser (if using public instance)
- [ ] ✅ (Optional) LibreTranslate self-hosted instance is running (if using custom URL)

---

## Fallback Behavior

If LibreTranslate fails, the system will:

1. Log the error to server console with full details
2. Save a placeholder translation like: `[فارسی] Shoe`
3. You can then manually edit it in the admin panel

---

## Self-Hosting LibreTranslate (Recommended for Production)

For better reliability and performance, self-host LibreTranslate:

### Using Docker:

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

### Using Docker Compose:

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  libretranslate:
    image: libretranslate/libretranslate
    restart: unless-stopped
    ports:
      - '5000:5000'
    environment:
      - LT_LOAD_ONLY=en,fa,ar,es,fr,de
```

Then run:

```bash
docker-compose up -d
```

### Configure your app to use self-hosted instance:

Add to `.env`:

```bash
LIBRE_TRANSLATE_URL=http://localhost:5000/translate
```

Restart the API server.

---

## Still Not Working?

1. **Check server is running**: Navigate to `https://localhost:4000/graphql`
2. **Check browser console** for GraphQL errors
3. **Check network tab** in browser DevTools for failed requests
4. **Share server logs** with the development team
