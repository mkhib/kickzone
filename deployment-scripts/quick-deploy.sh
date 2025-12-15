#!/bin/bash
# Quick deployment script - runs all setup steps in order

set -e

echo "=========================================="
echo "Master's Key Complete Deployment Script"
echo "=========================================="
echo ""

# Check if running as deployuser with sudo
if [ "$EUID" -eq 0 ] && [ "$SUDO_USER" != "deployuser" ]; then
    echo "⚠️  Warning: Not running as deployuser. Some steps may need adjustment."
fi

PROJECT_DIR="/opt/masterskey"

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
    echo "  sudo git clone git@github.com/mkhib/kickzone.git masterskey"
    echo "  sudo chown -R deployuser:deployuser /opt/masterskey"
    echo ""
    echo "Or if you haven't set up SSH keys yet:"
    echo "  1. Generate SSH key: ssh-keygen -t ed25519"
    echo "  2. Add to GitHub: cat ~/.ssh/id_ed25519.pub"
    echo "  3. Then clone with SSH URL above"
    exit 1
else
    echo "✅ Repository found"
    # Pull latest code if repository exists
    echo "📥 Pulling latest code..."
    cd "$PROJECT_DIR"
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "master")
    git pull origin "$CURRENT_BRANCH" || echo "⚠️  Git pull failed, continuing with existing code..."
fi

# Step 5: Install dependencies
echo ""
echo "Step 5: Installing dependencies..."
cd "$PROJECT_DIR"
if [ ! -d "node_modules" ]; then
    echo "⚠️  Installing dependencies (this may take a while and use significant memory)..."
    echo "   If this fails with 'Killed', you may need to set up swap space:"
    echo "   sudo bash deployment-scripts/setup-swap.sh"
    echo ""
    
    # Try with memory limits to prevent OOM
    # Use NODE_OPTIONS to limit memory usage
    export NODE_OPTIONS="--max-old-space-size=2048"
    
    # Try yarn install with network concurrency limit
    yarn install --network-concurrency 1 || {
        echo ""
        echo "❌ yarn install failed. This is often due to low memory."
        echo ""
        echo "Solutions:"
        echo "1. Set up swap space: sudo bash deployment-scripts/setup-swap.sh"
        echo "2. Or try installing with npm instead: npm install"
        echo "3. Or increase server RAM"
        echo ""
        read -p "Would you like to set up swap space now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            sudo bash "$PROJECT_DIR/deployment-scripts/setup-swap.sh"
            echo "Retrying yarn install..."
            yarn install --network-concurrency 1
        else
            exit 1
        fi
    }
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
DB_USERNAME=masterskey_user
DB_PASSWORD=M1k1h1i1b1
DB_NAME=masterskey_db

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
yarn nx build kickzone-api --configuration=production
echo "✅ API built"

# Step 8: Set up API service
echo ""
echo "Step 8: Setting up API service..."
sudo bash deployment-scripts/setup-api-service.sh

# Step 9: Start API
echo ""
echo "Step 9: Starting API service..."
sudo systemctl start masterskey-api
sleep 3
sudo systemctl status masterskey-api --no-pager

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
sudo systemctl status masterskey-api --no-pager -l | head -3
sudo systemctl status postgresql --no-pager -l | head -3
echo ""
echo "Test your applications:"
echo "  - Admin: https://admins.masterskey.store"
echo "  - Seller: https://seller.masterskey.store"
echo "  - Customer: https://masterskey.store"
echo ""


