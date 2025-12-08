#!/bin/bash
# Quick deployment script - runs all setup steps in order

set -e

echo "=========================================="
echo "Kickzone Complete Deployment Script"
echo "=========================================="
echo ""

# Check if running as deployuser with sudo
if [ "$EUID" -eq 0 ] && [ "$SUDO_USER" != "deployuser" ]; then
    echo "⚠️  Warning: Not running as deployuser. Some steps may need adjustment."
fi

PROJECT_DIR="/opt/kickzone"

# Step 1: Install Node.js and Yarn
echo "Step 1: Installing Node.js and Yarn..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    sudo npm install -g yarn
else
    echo "✅ Node.js already installed"
fi

# Step 2: Install PostgreSQL
echo ""
echo "Step 2: Installing PostgreSQL..."
if ! command -v psql &> /dev/null; then
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
else
    echo "✅ PostgreSQL already installed"
fi

# Step 3: Set up database
echo ""
echo "Step 3: Setting up database..."
echo "Run this manually to set database password:"
echo "  sudo bash deployment-scripts/setup-postgres.sh"
read -p "Have you set up the database? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please run: sudo bash deployment-scripts/setup-postgres.sh"
    exit 1
fi

# Step 4: Clone repository (if not already done)
echo ""
echo "Step 4: Checking repository..."
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Repository not found. Please clone it first:"
    echo "  cd /opt"
    echo "  sudo git clone YOUR_REPO_URL kickzone"
    echo "  sudo chown -R deployuser:deployuser /opt/kickzone"
    exit 1
else
    echo "✅ Repository found"
fi

# Step 5: Install dependencies
echo ""
echo "Step 5: Installing dependencies..."
cd "$PROJECT_DIR"
if [ ! -d "node_modules" ]; then
    yarn install
else
    echo "✅ Dependencies already installed"
fi

# Step 6: Create .env file
echo ""
echo "Step 6: Checking .env file..."
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env <<EOF
# API Configuration
API_PORT=4000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=kickzone_user
DB_PASSWORD=CHANGE_ME
DB_NAME=kickzone_db

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=CHANGE_ME
EOF
    echo "⚠️  Please edit .env file and set your database password and JWT secret:"
    echo "  nano $PROJECT_DIR/.env"
    read -p "Press Enter after you've updated .env file..."
else
    echo "✅ .env file exists"
fi

# Step 7: Build API
echo ""
echo "Step 7: Building API..."
nx build kickzone-api --configuration=production
echo "✅ API built"

# Step 8: Set up API service
echo ""
echo "Step 8: Setting up API service..."
sudo bash deployment-scripts/setup-api-service.sh

# Step 9: Start API
echo ""
echo "Step 9: Starting API service..."
sudo systemctl start kickzone-api
sleep 3
sudo systemctl status kickzone-api --no-pager

# Step 10: Build and deploy apps
echo ""
echo "Step 10: Building and deploying React apps..."
bash deployment-scripts/deploy-apps.sh

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Services status:"
sudo systemctl status nginx --no-pager -l | head -3
sudo systemctl status kickzone-api --no-pager -l | head -3
sudo systemctl status postgresql --no-pager -l | head -3
echo ""
echo "Test your applications:"
echo "  - Admin: https://admins.masterskey.store"
echo "  - Seller: https://seller.masterskey.store"
echo "  - Customer: https://masterskey.store"
echo ""

