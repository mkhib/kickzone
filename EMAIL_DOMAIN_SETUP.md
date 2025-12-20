# Email Domain Setup Guide - masterskey.store

This guide explains how to configure Cloudflare to send emails from your `masterskey.store` domain using Gmail SMTP.

## Overview

Currently, emails are sent using Gmail OAuth2 API with a custom "From" address. To use `masterskey.store` as your email domain, you need to:

1. Set up email routing in Cloudflare (or use Gmail's SMTP with custom domain)
2. Configure DNS records for email authentication (SPF, DKIM, DMARC)
3. Update the `GMAIL_CUSTOM_FROM_ADDRESS` environment variable

## Option 1: Cloudflare Email Routing (Recommended)

Cloudflare Email Routing allows you to receive emails at `@masterskey.store` addresses and forward them to your Gmail account, while also allowing you to send emails from `@masterskey.store`.

### Step 1: Enable Email Routing in Cloudflare

1. Log in to your Cloudflare dashboard
2. Select your `masterskey.store` domain
3. Go to **Email** → **Email Routing**
4. Click **Get Started** and follow the setup wizard
5. Cloudflare will automatically add the necessary DNS records

### Step 2: Configure Email Addresses

1. In Cloudflare Email Routing, go to **Routing** → **Destination Addresses**
2. Add your Gmail address (e.g., `yourname@gmail.com`)
3. Go to **Routing** → **Custom Addresses**
4. Create a custom address like `noreply@masterskey.store` or `support@masterskey.store`
5. Set it to forward to your Gmail address

### Step 3: Update Environment Variable

Update your `.env` file on the server:

```bash
GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
```

Or for a more friendly address:

```bash
GMAIL_CUSTOM_FROM_ADDRESS=support@masterskey.store
```

### Step 4: Configure DNS Records for Email Authentication

Cloudflare Email Routing automatically adds MX records, but you should also configure:

#### SPF Record (Sender Policy Framework)

Add a TXT record:

- **Name**: `@` (or `masterskey.store`)
- **Type**: `TXT`
- **Content**: `v=spf1 include:_spf.mx.cloudflare.net ~all`

#### DKIM Record (DomainKeys Identified Mail)

Cloudflare Email Routing provides DKIM keys. Add them as TXT records:

- Go to **Email** → **Email Routing** → **DNS Records**
- Copy the DKIM records provided by Cloudflare
- Add them to your DNS (they should be added automatically)

#### DMARC Record (Domain-based Message Authentication)

Add a TXT record:

- **Name**: `_dmarc`
- **Type**: `TXT`
- **Content**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@masterskey.store`

## Option 2: Gmail with Custom Domain (Alternative)

If you prefer to use Gmail's SMTP directly with your custom domain:

### Step 1: Set Up Google Workspace (or use Gmail SMTP)

1. Sign up for Google Workspace (paid) OR
2. Use Gmail SMTP with a custom "From" address (current setup)

### Step 2: Configure DNS Records

Add these DNS records in Cloudflare:

#### MX Records (for receiving emails)

- **Name**: `@`
- **Type**: `MX`
- **Priority**: `1`
- **Content**: `aspmx.l.google.com`

Add additional MX records with priorities 5, 10, etc. (Google provides these)

#### SPF Record

- **Name**: `@`
- **Type**: `TXT`
- **Content**: `v=spf1 include:_spf.google.com ~all`

#### DKIM Record

- Google Workspace provides DKIM keys in the admin console
- Add them as TXT records with names like `google._domainkey`

#### DMARC Record

- **Name**: `_dmarc`
- **Type**: `TXT`
- **Content**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@masterskey.store`

### Step 3: Update Environment Variable

```bash
GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
```

## Current Setup (Gmail OAuth2)

Your current setup uses Gmail OAuth2 API, which allows sending emails with a custom "From" address. To use `masterskey.store`:

### Update Environment Variable

Simply update your `.env` file:

```bash
# Change from your current Gmail address to:
GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
```

**Note**: For this to work properly and avoid emails being marked as spam, you should:

1. **Set up SPF records** (see above)
2. **Set up DKIM** (if using Google Workspace)
3. **Set up DMARC** (see above)

Without proper DNS records, emails sent from `@masterskey.store` may be marked as spam or rejected by email providers.

## Testing Email Configuration

After updating the configuration:

1. **Update the environment variable** on your server:

   ```bash
   sudo nano /opt/masterskey/.env
   # Update GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
   ```

2. **Restart the API service**:

   ```bash
   sudo systemctl restart masterskey-api
   ```

3. **Test by creating a new seller** - the email should now come from `noreply@masterskey.store` (or your chosen address)

4. **Check email deliverability**:
   - Send a test email
   - Check if it arrives in inbox (not spam)
   - Use tools like [Mail-Tester](https://www.mail-tester.com/) to verify SPF, DKIM, and DMARC records

## Troubleshooting

### Emails Going to Spam

1. Verify SPF, DKIM, and DMARC records are correctly configured
2. Use [MXToolbox](https://mxtoolbox.com/) to check your DNS records
3. Ensure the "From" address matches your domain

### Emails Not Sending

1. Check API logs: `sudo journalctl -u masterskey-api -n 50`
2. If you see `invalid_grant` error, your OAuth refresh token has expired. See `EMAIL_OAUTH_SETUP.md` for instructions to regenerate it.
3. Verify Gmail OAuth credentials are still valid
4. Check that `GMAIL_CUSTOM_FROM_ADDRESS` is set correctly

### DNS Records Not Working

1. DNS propagation can take up to 48 hours
2. Use `dig` or `nslookup` to verify records:
   ```bash
   dig TXT masterskey.store
   dig TXT _dmarc.masterskey.store
   ```

## Recommended Email Addresses

Common email addresses for your application:

- `noreply@masterskey.store` - For automated emails (password setup, password reset)
- `support@masterskey.store` - For customer support
- `admin@masterskey.store` - For administrative purposes
- `notifications@masterskey.store` - For system notifications

## Environment Variables Reference

```bash
# Gmail OAuth Configuration
GMAIL_OAUTH_CLIENT_ID=your_client_id
GMAIL_OAUTH_CLIENT_SECRET=your_client_secret
GMAIL_OAUTH_REFRESH_TOKEN=your_refresh_token

# Email From Address (update this to use masterskey.store)
GMAIL_CUSTOM_FROM_ADDRESS=noreply@masterskey.store
```

## Additional Resources

- [Cloudflare Email Routing Documentation](https://developers.cloudflare.com/email-routing/)
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [SPF Record Syntax](https://www.openspf.org/SPF_Record_Syntax)
- [DMARC Guide](https://dmarc.org/wiki/FAQ)
- **For OAuth issues**: See `EMAIL_OAUTH_SETUP.md` for Gmail OAuth setup and troubleshooting
