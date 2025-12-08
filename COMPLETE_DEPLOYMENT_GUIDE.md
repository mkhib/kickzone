# Complete Deployment Guide: Build, Database, API, and Apps

This guide walks you through the complete deployment process step by step.

## Prerequisites

- Linux server with `deployuser` (with sudo access)
- Domain names configured with DNS
- nginx installed and configured (already done)
- SSL certificates obtained (already done)

## Step 1: Install Required Software

### 1.1 Install Node.js and Yarn

```bash
# As deployuser, install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install Yarn
sudo npm install -g yarn

# Verify Yarn
yarn --version
```

### 1.2 Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check status
sudo systemctl status postgresql
```

### 1.3 Install Build Tools

```bash
# Install build essentials (for native modules)
sudo apt install -g build-essential python3
```

## Step 2: Set Up PostgreSQL Database

### 2.1 Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE kickzone_db;
CREATE USER kickzone_user WITH PASSWORD 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE kickzone_db TO kickzone_user;
ALTER USER kickzone_user CREATEDB;
\q
```

**Important:** Replace `YOUR_SECURE_PASSWORD_HERE` with a strong password. Save it - you'll need it for the `.env` file.

### 2.2 Verify Database Connection

```bash
# Test connection
sudo -u postgres psql -d kickzone_db -c "SELECT version();"
```

## Step 3: Clone and Prepare Repository

### 3.1 Clone Repository

```bash
# As deployuser, clone to /opt
cd /opt
sudo git clone YOUR_REPO_URL kickzone
sudo chown -R deployuser:deployuser /opt/kickzone
cd /opt/kickzone
```

### 3.2 Install Dependencies

```bash
# Install all dependencies
yarn install

# This may take several minutes
```

## Step 4: Configure Environment Variables

### 4.1 Create .env File

```bash
# Create .env file in project root
nano /opt/kickzone/.env
```

Add the following content:

```bash
# API Configuration
API_PORT=4000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=kickzone_user
DB_PASSWORD=YOUR_SECURE_PASSWORD_HERE
DB_NAME=kickzone_db

# JWT Secret (generate a random string)
JWT_SECRET=YOUR_JWT_SECRET_HERE

# Optional: LibreTranslate (uses public instance by default)
# LIBRE_TRANSLATE_URL=https://libretranslate.com/translate
# LIBRE_TRANSLATE_API_KEY=your_key_here

# Optional: Additional CORS origins
# ALLOWED_ORIGINS=https://example.com
```

**Generate JWT Secret:**
```bash
# Generate a secure random string for JWT_SECRET
openssl rand -base64 32
```

Copy the output and use it as `JWT_SECRET` in your `.env` file.

### 4.2 Set Proper Permissions

```bash
# Make .env readable only by owner
chmod 600 /opt/kickzone/.env
```

## Step 5: Build the API Server

### 5.1 Build API

```bash
cd /opt/kickzone

# Build the API
nx build kickzone-api --configuration=production

# Verify build output
ls -la apps/kickzone-api/dist/
```

The built API will be in `apps/kickzone-api/dist/`.

### 5.2 Create Uploads Directory

```bash
# Create directory for file uploads
mkdir -p /opt/kickzone/uploads
sudo chown -R deployuser:www-data /opt/kickzone/uploads
chmod -R 755 /opt/kickzone/uploads
```

## Step 6: Set Up API as Systemd Service

### 6.1 Create Service File

```bash
# Create systemd service
sudo nano /etc/systemd/system/kickzone-api.service
```

Add the following content:

```ini
[Unit]
Description=Kickzone API Server
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/opt/kickzone
EnvironmentFile=/opt/kickzone/.env
Environment=NODE_ENV=production
ExecStart=/usr/bin/node /opt/kickzone/apps/kickzone-api/dist/main.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

# Security settings
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### 6.2 Set Permissions

```bash
# Make sure www-data can access the project
sudo chown -R www-data:www-data /opt/kickzone/apps/kickzone-api/dist
sudo chown -R www-data:www-data /opt/kickzone/uploads

# Set permissions
sudo chmod 755 /opt/kickzone
sudo chmod 600 /opt/kickzone/.env
```

### 6.3 Enable and Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service (start on boot)
sudo systemctl enable kickzone-api

# Start the service
sudo systemctl start kickzone-api

# Check status
sudo systemctl status kickzone-api

# View logs
sudo journalctl -u kickzone-api -f
```

### 6.4 Verify API is Running

```bash
# Check if API is listening on port 4000
sudo netstat -tlnp | grep 4000
# OR
sudo ss -tlnp | grep 4000

# Test API health (if you have a health endpoint)
curl http://localhost:4000/api
```

## Step 7: Build React Applications

### 7.1 Build All Three Apps

```bash
cd /opt/kickzone

# Build admin panel
nx build kickzone-admins --configuration=production

# Build seller panel
nx build kickzone-sellers --configuration=production

# Build customer panel
nx build kickzone-customers --configuration=production
```

### 7.2 Verify Build Outputs

```bash
# Check build outputs
ls -la dist/apps/client/

# Should see:
# - admins/
# - sellers/
# - customers/
```

## Step 8: Deploy React Apps to Web Directory

### 8.1 Create Web Directory Structure

```bash
# Create directory structure
sudo mkdir -p /var/www/masterskey/dist/apps/client

# Copy built apps
sudo cp -r /opt/kickzone/dist/apps/client/* /var/www/masterskey/dist/apps/client/

# Set ownership
sudo chown -R www-data:www-data /var/www/masterskey

# Set permissions
sudo chmod -R 755 /var/www/masterskey
```

### 8.2 Verify Files are in Place

```bash
# Check each app
ls -la /var/www/masterskey/dist/apps/client/admins/
ls -la /var/www/masterskey/dist/apps/client/sellers/
ls -la /var/www/masterskey/dist/apps/client/customers/

# Each should have index.html and assets/
```

## Step 9: Verify nginx Configuration

### 9.1 Test nginx Configuration

```bash
# Test nginx config
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

### 9.2 Verify All Services are Running

```bash
# Check all services
sudo systemctl status nginx
sudo systemctl status kickzone-api
sudo systemctl status postgresql
sudo systemctl status x-ui  # Your 3x-ui panel
```

## Step 10: Test Everything

### 10.1 Test Each Subdomain

```bash
# Test admin panel
curl -I https://admins.masterskey.store

# Test seller panel
curl -I https://seller.masterskey.store

# Test customer panel
curl -I https://masterskey.store

# Test 3x-ui panels
curl -I https://fat.mkstudio.click
curl -I https://fat2.mkstudio.click
```

### 10.2 Test API Endpoints

```bash
# Test GraphQL endpoint
curl https://masterskey.store/graphql

# Should return GraphQL response or error (not 404)
```

### 10.3 Check Logs

```bash
# API logs
sudo journalctl -u kickzone-api -n 50

# nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

## Step 11: Database Initialization

### 11.1 Start API to Initialize Database

The API will automatically create tables when it starts (because `synchronize: true` is set in TypeORM config).

```bash
# Check API logs to see if database was initialized
sudo journalctl -u kickzone-api -n 100 | grep -i "database\|typeorm\|connected"
```

### 11.2 Verify Database Tables

```bash
# Connect to database
sudo -u postgres psql -d kickzone_db

# List tables
\dt

# Should see tables like: user, product, category, etc.

# Exit
\q
```

## Step 12: Create Initial Admin User (if needed)

If your API has a seed script or admin creation endpoint:

```bash
# Check if there's a seed script
ls -la /opt/kickzone/apps/kickzone-api/src/ | grep -i seed

# Or use GraphQL mutation to create admin user
# Access GraphQL playground at: https://admins.masterskey.store/graphql
# (if playground is enabled)
```

## Step 13: Final Verification Checklist

- [ ] PostgreSQL is running
- [ ] Database `kickzone_db` exists
- [ ] API service is running on port 4000
- [ ] API can connect to database
- [ ] All three React apps are built
- [ ] Apps are deployed to `/var/www/masterskey/dist/apps/client/`
- [ ] nginx is running and serving apps
- [ ] SSL certificates are valid
- [ ] All subdomains are accessible via HTTPS
- [ ] API endpoints are accessible via nginx proxy
- [ ] 3x-ui panel is still accessible

## Step 14: Monitoring and Maintenance

### 14.1 Create Monitoring Script

```bash
# Create monitoring script
sudo nano /usr/local/bin/check-kickzone-services.sh
```

Add:

```bash
#!/bin/bash
echo "=== Service Status ==="
systemctl is-active --quiet nginx && echo "✅ nginx: RUNNING" || echo "❌ nginx: FAILED"
systemctl is-active --quiet kickzone-api && echo "✅ API: RUNNING" || echo "❌ API: FAILED"
systemctl is-active --quiet postgresql && echo "✅ PostgreSQL: RUNNING" || echo "❌ PostgreSQL: FAILED"
systemctl is-active --quiet x-ui && echo "✅ 3x-ui: RUNNING" || echo "❌ 3x-ui: FAILED"

echo ""
echo "=== Port Status ==="
netstat -tlnp | grep -E ':(80|443|4000|5432|2053)' | awk '{print $4, $7}'
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/check-kickzone-services.sh

# Test it
sudo /usr/local/bin/check-kickzone-services.sh
```

### 14.2 Set Up Log Rotation

```bash
# Configure log rotation for API
sudo nano /etc/logrotate.d/kickzone-api
```

Add:

```
/var/log/kickzone-api/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 www-data www-data
}
```

## Troubleshooting

### API Won't Start

```bash
# Check logs
sudo journalctl -u kickzone-api -n 100

# Common issues:
# - Database connection failed → Check DB credentials in .env
# - Port already in use → Check what's using port 4000
# - Missing dependencies → Run yarn install again
```

### Database Connection Errors

```bash
# Test database connection
sudo -u postgres psql -d kickzone_db -U kickzone_user

# If connection fails, check:
# - PostgreSQL is running
# - User exists and has permissions
# - Password is correct in .env
```

### Apps Not Loading

```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify files exist
ls -la /var/www/masterskey/dist/apps/client/admins/

# Check permissions
sudo chown -R www-data:www-data /var/www/masterskey
```

### 502 Bad Gateway

```bash
# API is not running or not accessible
sudo systemctl status kickzone-api
sudo netstat -tlnp | grep 4000

# Restart API
sudo systemctl restart kickzone-api
```

## Quick Reference Commands

```bash
# Restart all services
sudo systemctl restart nginx
sudo systemctl restart kickzone-api
sudo systemctl restart postgresql

# View logs
sudo journalctl -u kickzone-api -f
sudo tail -f /var/log/nginx/error.log

# Rebuild and redeploy apps
cd /opt/kickzone
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo systemctl reload nginx

# Update API
cd /opt/kickzone
git pull
yarn install
nx build kickzone-api --configuration=production
sudo systemctl restart kickzone-api
```

## Next Steps

1. **Create initial admin user** (via GraphQL or seed script)
2. **Configure email service** (if needed)
3. **Set up backups** for database
4. **Configure monitoring** (optional)
5. **Set up CI/CD** for automatic deployments (optional)

Your deployment is complete! All services should be running and accessible via their respective subdomains.

