#!/bin/bash
# Script to build and deploy React applications

set -e

PROJECT_DIR="/opt/kickzone"
WEB_DIR="/var/www/masterskey/dist/apps/client"

echo "Building and deploying React applications..."

# Check if running as deployuser or with sudo
if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Running as root. Consider using deployuser with sudo."
fi

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Project directory $PROJECT_DIR does not exist!"
    exit 1
fi

cd "$PROJECT_DIR"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    yarn install
fi

# Build applications
echo "🔨 Building admin panel..."
nx build kickzone-admins --configuration=production

echo "🔨 Building seller panel..."
nx build kickzone-sellers --configuration=production

echo "🔨 Building customer panel..."
nx build kickzone-customers --configuration=production

# Verify builds
if [ ! -d "dist/apps/client/admins" ] || [ ! -d "dist/apps/client/sellers" ] || [ ! -d "dist/apps/client/customers" ]; then
    echo "❌ Build failed! Check the output above for errors."
    exit 1
fi

echo "✅ Builds completed successfully!"

# Create web directory
echo "📁 Creating web directory..."
sudo mkdir -p "$WEB_DIR"

# Copy files
echo "📋 Copying files to web directory..."
sudo cp -r dist/apps/client/* "$WEB_DIR/"

# Set ownership and permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data /var/www/masterskey
sudo chmod -R 755 /var/www/masterskey

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Applications deployed to:"
echo "  - Admin: /var/www/masterskey/dist/apps/client/admins"
echo "  - Seller: /var/www/masterskey/dist/apps/client/sellers"
echo "  - Customer: /var/www/masterskey/dist/apps/client/customers"
echo ""
echo "Test your applications:"
echo "  - https://admins.masterskey.store"
echo "  - https://seller.masterskey.store"
echo "  - https://masterskey.store"

