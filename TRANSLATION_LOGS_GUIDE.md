# Translation Logging Guide

## What Logs to Look For

I've added comprehensive logging to both server and client. Here's what you'll see:

---

## 🖥️ SERVER LOGS (Terminal/Console where API runs)

### 1. Server Startup - LibreTranslate Configuration

When the server starts, you'll immediately see:

✅ **Default configuration (no setup required):**

```
[TranslationService] 🌍 LibreTranslate configured
[TranslationService] 📡 API URL: https://libretranslate.com/translate
[TranslationService] ✅ No API key required - using free public instance
[TranslationService] 💡 To self-host: docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

✅ **If using custom instance:**

```
[TranslationService] 🌍 LibreTranslate configured
[TranslationService] 📡 API URL: http://localhost:5000/translate
[TranslationService] ✅ No API key required - using free public instance
[TranslationService] 💡 To self-host: docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

---

### 2. When You Click "Translate to Other Languages"

You'll see a detailed breakdown:

```
[TranslationService] ═══════════════════════════════════════════════
[TranslationService] 🌍 BULK TRANSLATION STARTED
[TranslationService] 📦 Entity Type: category
[TranslationService] 🆔 Entity IDs: [1]
[TranslationService] 🔤 Source Locale: en
[TranslationService] 🎯 Target Locales: [fa, ar]
[TranslationService] ═══════════════════════════════════════════════
[TranslationService] ✅ Found 1 source translations for category entities 1 in locale en

[TranslationService] 📝 Processing Entity ID: 1
[TranslationService]   📄 Field: name = "Shoe"
[TranslationService]     🔄 Translating to fa...
[TranslationService]     🔄 Calling LibreTranslate API: "Shoe" → fa
[TranslationService]     ✅ LibreTranslate Response (234ms): "کفش"
[TranslationService]     ✅ SUCCESS: "Shoe" → "کفش" (fa)
[TranslationService]     🔄 Translating to ar...
[TranslationService]     🔄 Calling LibreTranslate API: "Shoe" → ar
[TranslationService]     ✅ LibreTranslate Response (189ms): "حذاء"
[TranslationService]     ✅ SUCCESS: "Shoe" → "حذاء" (ar)

[TranslationService] ═══════════════════════════════════════════════
[TranslationService] 📊 BULK TRANSLATION SUMMARY
[TranslationService] ✅ Successful: 2
[TranslationService] ⏭️  Skipped (already exist): 0
[TranslationService] ❌ Failed: 0
[TranslationService] ═══════════════════════════════════════════════
```

---

### 3. If Translation Already Exists

```
[TranslationService] 📝 Processing Entity ID: 1
[TranslationService]   📄 Field: name = "Shoe"
[TranslationService]     ⏭️  Skipping fa: Translation already exists
[TranslationService]     ⏭️  Skipping ar: Translation already exists
```

---

### 4. If LibreTranslate API Fails

You'll see detailed error information:

```
[TranslationService] ═══════════════════════════════════════════════
[TranslationService] ❌ LIBRETRANSLATE API ERROR
[TranslationService] Duration: 1234ms
[TranslationService] Target Language: fa
[TranslationService] Text: "Shoe"
[TranslationService] Status: 429
[TranslationService] Response: {"error":"Too Many Requests"}
[TranslationService] Message: Request failed with status code 429
[TranslationService] ═══════════════════════════════════════════════
[TranslationService] ⚠️  Using fallback text: "[فارسی] Shoe"
[TranslationService]     ✅ SUCCESS: "Shoe" → "[فارسی] Shoe" (fa)
```

---

## 🌐 CLIENT LOGS (Browser Console - F12)

### 1. When You Click "Translate to Other Languages"

Open **Browser Developer Tools (F12)** → **Console** tab:

```
═══════════════════════════════════════════════
🌍 [CLIENT] BULK TRANSLATION REQUEST
📦 Entity Type: category
🆔 Entity IDs: [1]
🔤 Source Locale: en
🎯 Target Locales: ['fa', 'ar']
═══════════════════════════════════════════════
```

---

### 2. When Translation Completes Successfully

```
✅ [CLIENT] Bulk translation completed successfully!
📊 Result: { data: { bulkTranslateEntities: true } }
═══════════════════════════════════════════════
```

---

### 3. If Translation Fails

```
❌ [CLIENT] Bulk translation FAILED!
Error details: ApolloError: GraphQL error: ...
═══════════════════════════════════════════════
```

---

### 4. When You Manually Edit a Translation

```
🔵 [CLIENT] Setting translation: {
  entityType: 'category',
  entityId: 1,
  locale: 'fa',
  fieldName: 'name',
  value: 'کفش',
  isAutoTranslated: false
}
✅ [CLIENT] Translation saved successfully: { ... }
```

---

## 🔍 How to Test

### Step 1: Start the Server

```bash
nx serve kickzone-api
```

**Expected output on startup:**

```
[TranslationService] 🌍 LibreTranslate configured
[TranslationService] 📡 API URL: https://libretranslate.com/translate
[TranslationService] ✅ No API key required - using free public instance
```

### Step 2: Open Admin Panel

```
https://localhost:4300
```

### Step 3: Go to Translation Management

Navigate to: **Translation Management** → **Categories** tab

### Step 4: Click "Translate to Other Languages"

Click on any category's "Translate to Other Languages" button

### Step 5: Check Logs

**Server Console:**

- Should show the bulk translation process
- Should show Google API calls
- Should show success/failure for each translation

**Browser Console (F12):**

- Should show the client request
- Should show the completion/error

---

## 📊 Log Levels Explained

### Server Logs:

- `[TranslationService] 🌍` = **Startup/Configuration**
- `[TranslationService] 📡` = **API URL Configuration**
- `[TranslationService] 🔄` = **Translation in progress**
- `[TranslationService] ═══` = **Process Start/End**
- `[TranslationService] ✅` = **Success**
- `[TranslationService] ⏭️` = **Skipped (already exists)**
- `[TranslationService] ❌` = **Error**
- `[TranslationService] ⚠️` = **Warning**
- `[TranslationService] 📊` = **Summary**

### Client Logs:

- `🌍 [CLIENT]` = **Bulk translation request**
- `🔵 [CLIENT]` = **Single translation save**
- `✅ [CLIENT]` = **Success**
- `❌ [CLIENT]` = **Error**

---

## 🐛 Common Issues and Their Logs

### Issue 1: Connection Timeout

**Server Log:**

```
❌ LIBRETRANSLATE API ERROR
Message: timeout of 10000ms exceeded
```

**Solution:** Public instance might be busy. Try again or self-host LibreTranslate.

---

### Issue 2: Rate Limit Exceeded

**Server Log:**

```
❌ LIBRETRANSLATE API ERROR
Status: 429
Response: {"error":"Too Many Requests"}
```

**Solution:** Wait a few minutes or self-host for unlimited requests.

---

### Issue 3: Network Error

**Server Log:**

```
❌ LIBRETRANSLATE API ERROR
Message: Network Error
```

**Solution:** Check internet connection. Verify https://libretranslate.com is accessible.

---

### Issue 4: Unsupported Language

**Server Log:**

```
Response: {"error": "Unsupported language pair"}
```

**Solution:** Check that the target language is supported by LibreTranslate.

---

### Issue 5: No Source Translation

**Server Log:**

```
⚠️  No source translations found for category entities 1 in locale en
```

**Solution:** First save an English name for the category before translating

---

## 📝 Quick Test Script

Want to test quickly? Use this checklist:

1. ✅ Start API server
2. ✅ Check for "🌍 LibreTranslate configured" message
3. ✅ Verify "📡 API URL: https://libretranslate.com/translate" is shown
4. ✅ Open browser console (F12)
5. ✅ Go to Translation Management
6. ✅ Click "Translate to Other Languages"
7. ✅ Watch both server AND browser logs
8. ✅ Look for "🔄 Calling LibreTranslate API" messages in server
9. ✅ Look for "📊 BULK TRANSLATION SUMMARY" in server
10. ✅ Look for "✅ [CLIENT] Bulk translation completed" in browser

If you see all ✅ marks, translation is working! 🎉

---

## 🆘 Still Having Issues?

If logs show errors:

1. Copy the **full error message** from server console
2. Copy the **full error** from browser console
3. Check `TRANSLATION_DEBUGGING.md` for solutions
4. Look for the specific error message in the debugging guide

The logs will tell you **exactly** what's wrong! 🎯
