#!/bin/bash
# Script to pull latest code from GitHub and rebuild everything

set -e

PROJECT_DIR="/opt/masterskey"
WEB_DIR="/var/www/masterskey/dist/apps/client"

echo "=========================================="
echo "Master's Key Update and Rebuild Script"
echo "=========================================="
echo ""

# Check if running as deployuser or with sudo
if [ "$EUID" -eq 0 ] && [ "$SUDO_USER" != "deployuser" ]; then
    echo "⚠️  Warning: Not running as deployuser. Consider using: sudo -u deployuser bash $0"
fi

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Project directory $PROJECT_DIR does not exist!"
    exit 1
fi

cd "$PROJECT_DIR"

# Step 1: Pull latest code
echo "📥 Pulling latest code from GitHub..."
git fetch origin
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git pull origin "$CURRENT_BRANCH"

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed! Check your SSH keys and repository access."
    exit 1
fi

echo "✅ Code updated"

# Step 2: Install/update dependencies
echo ""
echo "📦 Installing/updating dependencies..."

# Use memory limits to prevent OOM
export NODE_OPTIONS="--max-old-space-size=2048"

# Try yarn install with network concurrency limit
yarn install --network-concurrency 1 || {
    echo ""
    echo "❌ yarn install failed. This is often due to low memory."
    echo "   Set up swap space: sudo bash deployment-scripts/setup-swap.sh"
    exit 1
}

# Step 3: Build API
echo ""
echo "🔨 Building API..."
yarn nx build kickzone-api --configuration=production

if [ ! -f "apps/kickzone-api/dist/main.js" ]; then
    echo "❌ API build failed!"
    exit 1
fi

echo "✅ API built successfully"

# Step 4: Build React apps
echo ""
echo "🔨 Building React applications..."

echo "  - Building admin panel..."
yarn nx build kickzone-admins --configuration=production

echo "  - Building seller panel..."
yarn nx build kickzone-sellers --configuration=production

echo "  - Building customer panel..."
yarn nx build kickzone-customers --configuration=production

# Verify builds
if [ ! -d "dist/apps/client/admins" ] || \
   [ ! -d "dist/apps/client/sellers" ] || \
   [ ! -d "dist/apps/client/customers" ]; then
    echo "❌ React app builds failed!"
    exit 1
fi

echo "✅ All React apps built successfully"

# Step 5: Deploy React apps
echo ""
echo "📋 Deploying React apps to web directory..."
sudo mkdir -p "$WEB_DIR"
sudo cp -r dist/apps/client/* "$WEB_DIR/"
sudo chown -R www-data:www-data /var/www/masterskey
sudo chmod -R 755 /var/www/masterskey

echo "✅ React apps deployed"

# Step 6: Restart API service
echo ""
echo "🔄 Restarting API service..."
sudo systemctl restart masterskey-api

# Wait a moment for service to start
sleep 2

# Check if service is running
if sudo systemctl is-active --quiet masterskey-api; then
    echo "✅ API service restarted successfully"
else
    echo "⚠️  API service may have issues. Check logs: sudo journalctl -u masterskey-api -n 50"
fi

# Step 7: Reload nginx
echo ""
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

echo ""
echo "=========================================="
echo "✅ Update and rebuild complete!"
echo "=========================================="
echo ""
echo "Services status:"
sudo systemctl is-active --quiet masterskey-api && echo "✅ API: RUNNING" || echo "❌ API: FAILED"
sudo systemctl is-active --quiet nginx && echo "✅ nginx: RUNNING" || echo "❌ nginx: FAILED"
sudo systemctl is-active --quiet postgresql && echo "✅ PostgreSQL: RUNNING" || echo "❌ PostgreSQL: FAILED"
echo ""
echo "View API logs: sudo journalctl -u masterskey-api -f"
echo ""

