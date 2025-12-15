# Deployment Scripts

This directory contains scripts to help deploy Master's Key to a Linux server.

## Scripts Overview

### Initial Setup

1. **setup-server.sh** - Complete server setup (run once on fresh server)
   - Installs Node.js, Yarn, PostgreSQL, nginx, Git
   - Creates deployuser
   - Sets up directories
   - Run as: `sudo bash setup-server.sh`

### Database Setup

2. **setup-postgres.sh** - PostgreSQL database setup
   - Creates database and user
   - Sets up permissions
   - Run as: `sudo bash setup-postgres.sh`

### API Setup

3. **setup-api-service.sh** - Creates systemd service for API
   - Creates `/etc/systemd/system/masterskey-api.service`
   - Sets up permissions
   - Run as: `sudo bash setup-api-service.sh`
   - Requires: API already built and .env file exists

### Application Deployment

4. **deploy-apps.sh** - Build and deploy React applications

   - Builds all three React apps (admins, sellers, customers)
   - Copies to web directory
   - Reloads nginx
   - Run as: `bash deploy-apps.sh` (as deployuser with sudo)

5. **update-and-rebuild.sh** - Pull code and rebuild everything

   - Pulls latest code from GitHub
   - Installs dependencies
   - Rebuilds API and React apps
   - Deploys and restarts services
   - Run as: `bash update-and-rebuild.sh` (as deployuser with sudo)

6. **quick-deploy.sh** - Complete deployment from scratch
   - Runs all setup steps in order
   - Interactive prompts for database setup
   - Run as: `sudo bash quick-deploy.sh`

## Usage Flow

### First Time Deployment

```bash
# 1. On fresh server, run initial setup
sudo bash deployment-scripts/setup-server.sh

# 2. Switch to deployuser and set up Git
su - deployuser
ssh-keygen -t ed25519
cat ~/.ssh/id_ed25519.pub  # Add to GitHub

# 3. Clone repository
cd /opt
sudo git clone git@github.com/mkhib/kickzone.git masterskey
sudo chown -R deployuser:deployuser /opt/masterskey

# 4. Set up database
sudo bash deployment-scripts/setup-postgres.sh

# 5. Create .env file
cd /opt/masterskey
nano .env  # Add database credentials and other config

# 6. Run complete deployment
sudo bash deployment-scripts/quick-deploy.sh
```

### Updating Code

```bash
# As deployuser
cd /opt/masterskey
bash deployment-scripts/update-and-rebuild.sh
```

### Manual Steps

If you prefer manual control:

```bash
# Pull code
git pull origin master

# Install dependencies
yarn install

# Build API
nx build kickzone-api --configuration=production

# Build React apps
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production

# Deploy React apps
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo chown -R www-data:www-data /var/www/masterskey

# Restart services
sudo systemctl restart kickzone-api
sudo systemctl reload nginx
```

## Making Scripts Executable

On Linux server, make scripts executable:

```bash
chmod +x deployment-scripts/*.sh
```

## Troubleshooting

### Script Fails with Permission Denied

```bash
# Make executable
chmod +x deployment-scripts/SCRIPT_NAME.sh

# Or run with bash explicitly
bash deployment-scripts/SCRIPT_NAME.sh
```

### Git Pull Fails

Check SSH key is added to GitHub:

```bash
ssh -T git@github.com
```

### Build Fails

Clear cache and try again:

```bash
cd /opt/masterskey
rm -rf node_modules dist .nx
yarn install
```

## Script Requirements

- **setup-server.sh**: Root access, Ubuntu/Debian Linux
- **setup-postgres.sh**: Root access, PostgreSQL installed
- **setup-api-service.sh**: Root access, project directory exists
- **deploy-apps.sh**: deployuser with sudo, project directory exists
- **update-and-rebuild.sh**: deployuser with sudo, Git repository cloned
- **quick-deploy.sh**: Root access, Git repository cloned

## Notes

- All scripts use `set -e` to exit on errors
- Scripts check for prerequisites before running
- Scripts provide helpful error messages
- Most scripts can be run multiple times safely (idempotent)
