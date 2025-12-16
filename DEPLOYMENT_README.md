# Master's Key Deployment Guide

Complete guide for deploying Master's Key to a Linux server, including Git setup, building, and running all services.

## Quick Start

### 1. Initial Server Setup

Run the server setup script on a fresh Linux server:

```bash
# On your Linux server, as root
sudo bash deployment-scripts/setup-server.sh
```

This will install:

- Node.js 20.x
- Yarn
- PostgreSQL
- nginx
- Git
- Build tools

### 2. Set Up Git and Clone Repository

```bash
# Switch to deployuser
su - deployuser

# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "deployuser@fat-server"
M1k1h1i1b1
cat ~/.ssh/id_ed25519.pub
```

**Add SSH Key to GitHub:**

1. Copy the public key output
2. Go to GitHub → Settings → SSH and GPG keys → New SSH key
3. Paste and save

```bash
# Test GitHub connection
ssh -T git@github.com

# Clone repository
cd /opt
sudo git clone git@github.com:mkhib/kickzone.git masterskey
sudo chown -R deployuser:deployuser /opt/masterskey
cd /opt/masterskey
```

### 3. Set Up Database

```bash
sudo bash deployment-scripts/setup-postgres.sh
```

Follow the prompts to create database and user.

### 5. Configure Environment

```bash
# Create .env file
nano /opt/masterskey/.env
```

Add your configuration (see `ENV_VARIABLES.md` for details):

```bash
API_PORT=4000
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=masterskey_user
DB_PASSWORD=your_password_here
DB_NAME=masterskey_db
JWT_SECRET=$(openssl rand -base64 32)
```

### 6. Build and Deploy

```bash
# Run the complete deployment script
sudo bash deployment-scripts/quick-deploy.sh
```

This will:

- Install dependencies
- Build API
- Build React apps (admins, sellers, customers)
- Set up API as systemd service
- Deploy React apps to web directory
- Start all services

## Updating Code

### Manual Update

```bash
# Pull latest code and rebuild everything
bash deployment-scripts/update-and-rebuild.sh
```

Or manually:

```bash
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

### Auto-Deploy with GitHub Actions

1. Push code to GitHub (master/main branch)
2. GitHub Actions will automatically build (see `.github/workflows/deploy.yml`)
3. Optionally configure auto-deploy to server (uncomment deploy steps in workflow)

## Project Structure

```
/opt/masterskey/              # Project root
├── apps/
│   ├── kickzone-api/      # NestJS API server
│   └── client/
│       ├── admins/        # Admin panel (React)
│       ├── sellers/       # Seller panel (React)
│       └── customers/     # Customer panel (React)
├── libs/                  # Shared libraries
├── deployment-scripts/    # Deployment scripts
└── .env                   # Environment variables

/var/www/masterskey/       # Web directory (nginx serves from here)
└── dist/apps/client/     # Built React apps
```

## Services

### API Service

- **Service name:** `masterskey-api`
- **Port:** 4000
- **Status:** `sudo systemctl status masterskey-api`
- **Logs:** `sudo journalctl -u masterskey-api -f`
- **Restart:** `sudo systemctl restart masterskey-api`

### PostgreSQL

- **Service name:** `postgresql`
- **Port:** 5432
- **Status:** `sudo systemctl status postgresql`
- **Connect:** `sudo -u postgres psql -d masterskey_db`

### nginx

- **Service name:** `nginx`
- **Ports:** 80, 443
- **Status:** `sudo systemctl status nginx`
- **Config:** `/etc/nginx/sites-available/masterskey.store`
- **Test config:** `sudo nginx -t`
- **Reload:** `sudo systemctl reload nginx`

## Subdomains

- **Admin Panel:** https://admins.masterskey.store
- **Seller Panel:** https://seller.masterskey.store
- **Customer Panel:** https://masterskey.store

## Building on Your PC and Transferring

If you prefer to build locally and transfer:

### Build Locally

```bash
# On your PC
yarn install
nx build kickzone-api --configuration=production
nx build kickzone-admins --configuration=production
nx build kickzone-sellers --configuration=production
nx build kickzone-customers --configuration=production
```

### Transfer to Server

```bash
# From your PC
scp -r dist/apps/kickzone-api deployuser@your-server:/opt/masterskey/apps/
scp -r dist/apps/client deployuser@your-server:/var/www/masterskey/dist/apps/

# On server, set permissions
sudo chown -R www-data:www-data /var/www/masterskey
sudo chown -R www-data:www-data /opt/masterskey/apps/kickzone-api/dist
sudo systemctl restart masterskey-api
sudo systemctl reload nginx
```

## Troubleshooting

### Git Pull Fails

```bash
# Check SSH key
ssh -T git@github.com

# If fails, regenerate key
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
# Add to GitHub
```

### Build Fails

```bash
# Clear cache and rebuild
cd /opt/masterskey
rm -rf node_modules dist .nx
yarn install
nx reset
nx build kickzone-api --configuration=production
```

### yarn install Gets Killed (Out of Memory)

If `yarn install` fails with "Killed" error:

```bash
# 1. Set up swap space (recommended)
sudo bash deployment-scripts/setup-swap.sh

# 2. Use safe installation script
bash deployment-scripts/install-dependencies-safe.sh

# 3. Or manually with memory limits
export NODE_OPTIONS="--max-old-space-size=2048"
yarn install --network-concurrency 1
```

### API Won't Start

```bash
# Check logs
sudo journalctl -u masterskey-api -n 100

# Common issues:
# - Database connection: Check .env DB credentials
# - Port in use: sudo netstat -tlnp | grep 4000
# - Missing files: Check dist directory exists
```

### React Apps Not Loading

```bash
# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify files exist
ls -la /var/www/masterskey/dist/apps/client/admins/

# Check permissions
sudo chown -R www-data:www-data /var/www/masterskey
```

## Scripts Reference

- `setup-server.sh` - Initial server setup (run once)
- `setup-postgres.sh` - Database setup
- `setup-api-service.sh` - Create systemd service for API
- `deploy-apps.sh` - Build and deploy React apps
- `update-and-rebuild.sh` - Pull code and rebuild everything
- `quick-deploy.sh` - Complete deployment from scratch

## Security Notes

1. **SSH Keys:** Use SSH keys, not passwords for Git access
2. **.env File:** Keep `.env` file secure (chmod 600)
3. **Firewall:** Only expose ports 80, 443, and SSH (22)
4. **Updates:** Keep system packages updated: `sudo apt update && sudo apt upgrade`
5. **Backups:** Set up regular database backups

## Next Steps

1. Set up SSL certificates (if not already done)
2. Configure nginx (see `nginx.conf.example`)
3. Create initial admin user
4. Set up database backups
5. Configure monitoring (optional)

For detailed step-by-step instructions, see `COMPLETE_DEPLOYMENT_GUIDE.md`.
