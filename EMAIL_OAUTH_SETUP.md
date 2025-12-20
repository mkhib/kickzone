# Gmail OAuth Setup Guide

This guide explains how to set up Gmail OAuth2 for sending emails from your application.

## Problem: `invalid_grant` Error

If you see this error in your logs:

```
error: 'invalid_grant', error_description: 'Bad Request'
```

This means your Gmail OAuth refresh token has expired or been revoked. You need to regenerate it.

## Step-by-Step: Regenerate Gmail OAuth Refresh Token

### Step 1: Create Google Cloud Project (if not already done)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Gmail API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Gmail API"
   - Click **Enable**

### Step 2: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - Choose **External** (unless you have a Google Workspace)
   - Fill in required fields (App name, User support email, Developer contact)
   - Add scopes: `https://www.googleapis.com/auth/gmail.send`
   - Add test users (your Gmail address)
   - Save and continue
4. Create OAuth client:
   - Application type: **Web application**
   - Name: `Masters Key Email Service` (or any name)
   - Authorized redirect URIs: `http://localhost:3000/oauth2callback` (or your callback URL)
   - Click **Create**
5. **Save the Client ID and Client Secret** - you'll need these for your `.env` file

### Step 3: Generate Refresh Token

You have two options:

#### Option A: Using OAuth2 Playground (Easiest)

1. Go to [Google OAuth2 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right
3. Check **"Use your own OAuth credentials"**
4. Enter your **Client ID** and **Client Secret** from Step 2
5. In the left panel, find **Gmail API v1**
6. Select `https://www.googleapis.com/auth/gmail.send`
7. Click **Authorize APIs**
8. Sign in with the Gmail account you want to use for sending emails
9. Click **Allow** to grant permissions
10. Click **Exchange authorization code for tokens**
11. **Copy the Refresh Token** - this is what you need for `GMAIL_OAUTH_REFRESH_TOKEN`

#### Option B: Using Node.js Script

Create a file `generate-refresh-token.js`:

```javascript
const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Refresh Token:', token.refresh_token);
    console.log('Full token object:', JSON.stringify(token, null, 2));
  });
});
```

Run it:

```bash
node generate-refresh-token.js
```

Follow the prompts to get your refresh token.

### Step 4: Update Environment Variables

Update your `.env` file on the server:

```bash
# Gmail OAuth Configuration
GMAIL_OAUTH_CLIENT_ID=your_client_id_here
GMAIL_OAUTH_CLIENT_SECRET=your_client_secret_here
GMAIL_OAUTH_REFRESH_TOKEN=your_refresh_token_here

# Email From Address
GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
```

### Step 5: Restart the API Service

```bash
sudo systemctl restart masterskey-api
sudo systemctl status masterskey-api
```

### Step 6: Test Email Sending

Try creating a new seller or triggering a password reset to test if emails are sending correctly.

## Troubleshooting

### Refresh Token Expires

Refresh tokens can expire if:

- The user revokes access
- The token hasn't been used for 6 months
- The OAuth app is deleted or credentials are changed

**Solution**: Regenerate the refresh token using the steps above.

### "Access Denied" Error

If you get an access denied error:

1. Make sure you've added your email as a test user in the OAuth consent screen
2. If your app is in "Testing" mode, only test users can use it
3. Publish your app (if needed) or add more test users

### "Redirect URI Mismatch"

If you see this error:

1. Make sure the redirect URI in your OAuth client matches exactly what you're using
2. Common redirect URIs:
   - `http://localhost:3000/oauth2callback` (for local testing)
   - `https://yourdomain.com/oauth2callback` (for production)

### Emails Going to Spam

Even with valid OAuth, emails might go to spam if:

1. SPF, DKIM, DMARC records aren't configured (see `EMAIL_DOMAIN_SETUP.md`)
2. The "From" address doesn't match your domain
3. You're sending too many emails too quickly

## Security Best Practices

1. **Never commit tokens to Git**: Keep `.env` files in `.gitignore`
2. **Rotate tokens periodically**: Regenerate refresh tokens every 6-12 months
3. **Use environment-specific credentials**: Different OAuth apps for dev/staging/prod
4. **Monitor API usage**: Check Google Cloud Console for unusual activity
5. **Limit scopes**: Only request the minimum scopes needed (`gmail.send`)

## Environment Variables Reference

```bash
# Required Gmail OAuth Variables
GMAIL_OAUTH_CLIENT_ID=your_client_id_from_google_cloud
GMAIL_OAUTH_CLIENT_SECRET=your_client_secret_from_google_cloud
GMAIL_OAUTH_REFRESH_TOKEN=your_refresh_token_from_oauth_flow

# Optional (for reference)
GMAIL_AUTHORIZED_EMAIL=your_gmail_account@gmail.com

# Email From Address
GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
```

## Quick Fix for Current Error

If you're seeing the `invalid_grant` error right now:

1. **Quick fix**: Use OAuth2 Playground (Option A above) to get a new refresh token
2. **Update `.env`** on your server:
   ```bash
   sudo nano /opt/masterskey/.env
   # Update GMAIL_OAUTH_REFRESH_TOKEN with new token
   ```
3. **Restart service**:
   ```bash
   sudo systemctl restart masterskey-api
   ```
4. **Test**: Create a new seller to verify emails are sending

## Additional Resources

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [OAuth2 Playground](https://developers.google.com/oauthplayground/)
- [Google Cloud Console](https://console.cloud.google.com/)
