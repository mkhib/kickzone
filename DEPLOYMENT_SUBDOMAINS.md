# Subdomain Deployment Guide

## Overview

This guide explains how to deploy the three React applications to different subdomains using nginx.

## Architecture

- **admins.masterskey.store** → Admin Panel (`kickzone-admins`)
- **seller.masterskey.store** → Seller Panel (`kickzone-sellers`)
- **masterskey.store** / **www.masterskey.store** → Customer Panel (`kickzone-customers`)

## Why nginx (Not React)?

Subdomain routing must be handled at the **server/infrastructure level**, not in React:

1. **React apps are client-side** - They run in the browser after the initial HTML is loaded
2. **Subdomain routing happens before React** - The server needs to know which app to serve based on the subdomain
3. **Better performance** - Server-level routing is faster and more efficient
4. **SEO-friendly** - Each subdomain can have its own SSL certificate and configuration

## Prerequisites

1. **DNS Configuration**: Set up DNS A records for:
   - `admins.masterskey.store` → Your server IP
   - `seller.masterskey.store` → Your server IP
   - `masterskey.store` → Your server IP
   - `www.masterskey.store` → Your server IP (CNAME to masterskey.store)

2. **SSL Certificates**: Obtain SSL certificates (Let's Encrypt recommended):
   ```bash
   sudo certbot certonly --nginx -d masterskey.store -d www.masterskey.store -d admins.masterskey.store -d seller.masterskey.store
   ```

3. **Build the applications**:
   ```bash
   nx build kickzone-admins
   nx build kickzone-sellers
   nx build kickzone-customers
   ```

## Deployment Steps

### 1. Build All Applications

```bash
# Build all three apps for production
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production
```

The built files will be in:
- `dist/apps/client/admins/`
- `dist/apps/client/sellers/`
- `dist/apps/client/customers/`

### 2. Copy Build Files to Server

```bash
# On your server, create directory structure
sudo mkdir -p /var/www/masterskey/dist/apps/client

# Copy build outputs (from your local machine or CI/CD)
scp -r dist/apps/client/* user@your-server:/var/www/masterskey/dist/apps/client/
```

### 3. Install and Configure nginx

```bash
# Install nginx (if not already installed)
sudo apt update
sudo apt install nginx

# Copy the nginx configuration
sudo cp nginx.conf.example /etc/nginx/sites-available/masterskey.store

# Update paths in the config file to match your setup
sudo nano /etc/nginx/sites-available/masterskey.store

# Enable the site
sudo ln -s /etc/nginx/sites-available/masterskey.store /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 4. Update nginx Configuration

Edit `/etc/nginx/sites-available/masterskey.store` and update:

1. **SSL certificate paths** (if using Let's Encrypt, they're usually in `/etc/letsencrypt/live/masterskey.store/`)
   - Update `ssl_certificate` to `/etc/letsencrypt/live/masterskey.store/fullchain.pem`
   - Update `ssl_certificate_key` to `/etc/letsencrypt/live/masterskey.store/privkey.pem`
2. **Root paths** to match where you deployed the build files
3. **Backend API URL** (currently set to `http://localhost:4000`)
   - Update the port if your API runs on a different port (check `API_PORT` environment variable)
   - Note: Use `http://` (not `https://`) for localhost communication between nginx and the API

### 5. Configure Backend API

The API CORS settings have been **already updated** in the codebase to include all production subdomains. The API will automatically allow requests from:
- Development origins (localhost:4300, 4400, 4500)
- Production origins (masterskey.store, www.masterskey.store, admins.masterskey.store, seller.masterskey.store)

If you need to add additional origins, set the `ALLOWED_ORIGINS` environment variable (comma-separated).

### 6. GraphQL Client Configuration

The GraphQL clients have been **automatically configured** to:
- Use relative paths (`/graphql`) in production (works with any subdomain via nginx proxy)
- Use `https://localhost:4000/graphql` in development

No additional configuration needed! The apps will automatically detect the environment and use the correct endpoint.

## Alternative: Docker Deployment

If you prefer Docker, you can use a docker-compose setup:

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./dist:/var/www/masterskey/dist:ro
      - ./ssl:/etc/ssl/certs:ro
    restart: unless-stopped
```

## Testing

After deployment, test each subdomain:

1. **Admin Panel**: https://admins.masterskey.store
2. **Seller Panel**: https://seller.masterskey.store
3. **Customer Panel**: https://masterskey.store or https://www.masterskey.store

## Troubleshooting

### Check nginx logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Verify DNS resolution
```bash
dig admins.masterskey.store
dig seller.masterskey.store
dig masterskey.store
```

### Test nginx configuration
```bash
sudo nginx -t
```

### Check if nginx is running
```bash
sudo systemctl status nginx
```

## Important Notes

1. **React Router**: Each React app should handle its own internal routing. The subdomain routing is only for serving the correct app.

2. **API Endpoints**: The GraphQL clients are automatically configured:
   - **Production**: Uses relative path `/graphql` (proxied by nginx to the API)
   - **Development**: Uses `https://localhost:4000/graphql`
   - You can override with `VITE_GRAPHQL_ENDPOINT` environment variable if needed

3. **Environment Variables**: 
   - **API**: Set `API_PORT` if your API runs on a different port (default: 3000, but apps expect 4000)
   - **Client Apps**: Optional `VITE_GRAPHQL_ENDPOINT` to override the GraphQL endpoint
   - **CORS**: Optional `ALLOWED_ORIGINS` (comma-separated) for additional API origins

4. **Caching**: The nginx config includes caching for static assets. Adjust cache headers as needed.

5. **Security**: Ensure your SSL certificates are valid and properly configured. Consider adding security headers (HSTS, CSP, etc.).

6. **API Port Mismatch**: The API defaults to port 3000, but the React apps and nginx config expect port 4000. Make sure to set `API_PORT=4000` in your API environment or update the nginx config and client apps accordingly.

