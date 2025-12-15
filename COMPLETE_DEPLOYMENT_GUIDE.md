# Complete Deployment Guide: Build, Database, API, and Apps

This guide walks you through the complete deployment process for Master's Key step by step.

**Quick Start:** See `DEPLOYMENT_README.md` for a condensed version.

## Prerequisites

- Linux server (Ubuntu/Debian recommended)
- Root or sudo access
- Domain names configured with DNS
- GitHub repository (private repo requires SSH key setup)
- Basic knowledge of Linux command line

**Note:** If starting from scratch, run `deployment-scripts/setup-server.sh` first to install all required software.

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
CREATE DATABASE masterskey_db;
CREATE USER masterskey_user WITH PASSWORD 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE masterskey_db TO masterskey_user;
ALTER USER masterskey_user CREATEDB;
\q
```

**Important:** Replace `YOUR_SECURE_PASSWORD_HERE` with a strong password. Save it - you'll need it for the `.env` file.

### 2.2 Verify Database Connection

```bash
# Test connection
sudo -u postgres psql -d masterskey_db -c "SELECT version();"
```

## Step 3: Set Up Git and Clone Repository

### 3.1 Install Git

```bash
# Install Git if not already installed
sudo apt update
sudo apt install -y git

# Verify installation
git --version
```

### 3.2 Set Up SSH Key for GitHub Private Repository

For private GitHub repositories, you need to set up SSH authentication:

```bash
# As deployuser, generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "deployuser@your-server" -f ~/.ssh/id_ed25519

# Display the public key
cat ~/.ssh/id_ed25519.pub
```

**Add SSH Key to GitHub:**

1. Copy the public key output from above
2. Go to GitHub → Settings → SSH and GPG keys → New SSH key
3. Paste the public key and save

**Test SSH Connection:**

```bash
# Test GitHub SSH connection
ssh -T git@github.com

# Should see: "Hi username! You've successfully authenticated..."
```

### 3.3 Configure Git (if needed)

```bash
# Set Git user info (optional, for commits)
git config --global user.name "Deploy User"
git config --global user.email "deployuser@yourdomain.com"
```

### 3.4 Clone Private Repository

```bash
# As deployuser, clone to /opt using SSH URL
cd /opt
sudo git clone git@github.com/mkhib/kickzone.git masterskey

# If you prefer HTTPS with token (alternative method):
# git clone https://YOUR_GITHUB_TOKEN@github.com/mkhib/kickzone.git masterskey

# Set ownership
sudo chown -R deployuser:deployuser /opt/masterskey
cd /opt/masterskey

# Verify you're on the correct branch
git branch -a
git checkout master  # or main, depending on your default branch
```

### 3.5 Install Dependencies

```bash
# Install all dependencies
yarn install

# This may take several minutes
```

### 3.6 Set Up Git Pull Script (for easy updates)

```bash
# Create a script to pull latest changes
cat > /opt/masterskey/pull-updates.sh << 'EOF'
#!/bin/bash
set -e
cd /opt/masterskey
git pull origin master  # or main
yarn install
echo "✅ Code updated successfully"
EOF

chmod +x /opt/masterskey/pull-updates.sh
```

## Step 4: Configure Environment Variables

### 4.1 Create .env File

```bash
# Create .env file in project root
nano /opt/masterskey/.env
```

Add the following content:

```bash
# API Configuration
API_PORT=4000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=masterskey_user
DB_PASSWORD=YOUR_SECURE_PASSWORD_HERE
DB_NAME=masterskey_db

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
chmod 600 /opt/masterskey/.env
```

## Step 5: Build the API Server

### 5.1 Build API

```bash
cd /opt/masterskey

# Build the API
nx build kickzone-api --configuration=production

# Verify build output
ls -la apps/kickzone-api/dist/
```

The built API will be in `apps/kickzone-api/dist/`.

### 5.2 Create Uploads Directory

```bash
# Create directory for file uploads
mkdir -p /opt/masterskey/uploads
sudo chown -R deployuser:www-data /opt/masterskey/uploads
chmod -R 755 /opt/masterskey/uploads
```

## Step 6: Set Up API as Systemd Service

### 6.1 Create Service File

```bash
# Create systemd service
sudo nano /etc/systemd/system/masterskey-api.service
```

Add the following content:

```ini
[Unit]
Description=Master's Key API Server
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/opt/masterskey
EnvironmentFile=/opt/masterskey/.env
Environment=NODE_ENV=production
ExecStart=/usr/bin/node /opt/masterskey/apps/kickzone-api/dist/main.js
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
sudo chown -R www-data:www-data /opt/masterskey/apps/kickzone-api/dist
sudo chown -R www-data:www-data /opt/masterskey/uploads

# Set permissions
sudo chmod 755 /opt/masterskey
sudo chmod 600 /opt/masterskey/.env
```

### 6.3 Enable and Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service (start on boot)
sudo systemctl enable masterskey-api

# Start the service
sudo systemctl start masterskey-api

# Check status
sudo systemctl status masterskey-api

# View logs
sudo journalctl -u masterskey-api -f
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
cd /opt/masterskey

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
sudo cp -r /opt/masterskey/dist/apps/client/* /var/www/masterskey/dist/apps/client/

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
sudo systemctl status masterskey-api
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
sudo journalctl -u masterskey-api -n 50

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
sudo journalctl -u masterskey-api -n 100 | grep -i "database\|typeorm\|connected"
```

### 11.2 Verify Database Tables

```bash
# Connect to database
sudo -u postgres psql -d masterskey_db

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
ls -la /opt/masterskey/apps/kickzone-api/src/ | grep -i seed

# Or use GraphQL mutation to create admin user
# Access GraphQL playground at: https://admins.masterskey.store/graphql
# (if playground is enabled)
```

## Step 13: Final Verification Checklist

- [ ] PostgreSQL is running
- [ ] Database `masterskey_db` exists
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
sudo nano /usr/local/bin/check-masterskey-services.sh
```

Add:

```bash
#!/bin/bash
echo "=== Service Status ==="
systemctl is-active --quiet nginx && echo "✅ nginx: RUNNING" || echo "❌ nginx: FAILED"
systemctl is-active --quiet masterskey-api && echo "✅ API: RUNNING" || echo "❌ API: FAILED"
systemctl is-active --quiet postgresql && echo "✅ PostgreSQL: RUNNING" || echo "❌ PostgreSQL: FAILED"
systemctl is-active --quiet x-ui && echo "✅ 3x-ui: RUNNING" || echo "❌ 3x-ui: FAILED"

echo ""
echo "=== Port Status ==="
netstat -tlnp | grep -E ':(80|443|4000|5432|2053)' | awk '{print $4, $7}'
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/check-masterskey-services.sh

# Test it
sudo /usr/local/bin/check-masterskey-services.sh
```

### 14.2 Set Up Log Rotation

```bash
# Configure log rotation for API
sudo nano /etc/logrotate.d/masterskey-api
```

Add:

```
/var/log/masterskey-api/*.log {
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
sudo journalctl -u masterskey-api -n 100

# Common issues:
# - Database connection failed → Check DB credentials in .env
# - Port already in use → Check what's using port 4000
# - Missing dependencies → Run yarn install again
```

### Database Connection Errors

```bash
# Test database connection
sudo -u postgres psql -d masterskey_db -U kickzone_user

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
sudo systemctl status masterskey-api
sudo netstat -tlnp | grep 4000

# Restart API
sudo systemctl restart masterskey-api
```

## Quick Reference Commands

```bash
# Restart all services
sudo systemctl restart nginx
sudo systemctl restart masterskey-api
sudo systemctl restart postgresql

# View logs
sudo journalctl -u masterskey-api -f
sudo tail -f /var/log/nginx/error.log

# Pull latest code from GitHub
cd /opt/masterskey
git pull origin master  # or main
yarn install

# Rebuild and redeploy React apps
cd /opt/masterskey
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo chown -R www-data:www-data /var/www/masterskey
sudo systemctl reload nginx

# Update and rebuild API
cd /opt/masterskey
git pull origin master  # or main
yarn install
nx build kickzone-api --configuration=production
sudo systemctl restart masterskey-api

# Full update (code + rebuild everything)
cd /opt/masterskey
git pull origin master  # or main
yarn install
nx build kickzone-api --configuration=production
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo chown -R www-data:www-data /var/www/masterskey
sudo systemctl restart masterskey-api
sudo systemctl reload nginx
```

## Step 15: Setting Up Auto-Deploy from GitHub (Optional but Recommended)

### 15.1 Option A: GitHub Actions CI/CD (Recommended)

See `.github/workflows/deploy.yml` for automated deployment workflow. This will:

- Build the API and React apps on push to master/main
- Optionally deploy to your server via SSH

**Setup:**

1. Add GitHub Secrets:

   - `SERVER_HOST`: Your server IP or domain
   - `SERVER_USER`: deployuser
   - `SSH_PRIVATE_KEY`: Your server's SSH private key
   - `SERVER_DEPLOY_PATH`: /opt/masterskey

2. The workflow will automatically build on push

### 15.2 Option B: Webhook-Based Auto-Deploy

Set up a webhook on your server to automatically pull and rebuild when code is pushed:

```bash
# Install webhook handler (example using webhook.sh)
sudo apt install -y webhook

# Create webhook script
sudo nano /opt/masterskey/webhook-deploy.sh
```

Add:

```bash
#!/bin/bash
cd /opt/masterskey
git pull origin master
yarn install
nx build kickzone-api --configuration=production
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo chown -R www-data:www-data /var/www/masterskey
sudo systemctl restart masterskey-api
sudo systemctl reload nginx
```

### 15.3 Manual Update Process

If not using auto-deploy, update manually:

```bash
# SSH into server
ssh deployuser@your-server

# Pull latest code
cd /opt/masterskey
git pull origin master  # or main

# Install any new dependencies
yarn install

# Rebuild API
nx build kickzone-api --configuration=production

# Rebuild React apps
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production

# Deploy React apps
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo chown -R www-data:www-data /var/www/masterskey

# Restart services
sudo systemctl restart masterskey-api
sudo systemctl reload nginx
```

## Next Steps

1. **Create initial admin user** (via GraphQL or seed script)
2. **Configure email service** (if needed)
3. **Set up backups** for database
4. **Configure monitoring** (optional)
5. **Set up CI/CD** using GitHub Actions (see Step 15)

Your deployment is complete! All services should be running and accessible via their respective subdomains.
