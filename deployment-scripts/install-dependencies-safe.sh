#!/bin/bash
# Safe dependency installation script with memory management
# Use this if regular yarn install fails due to memory issues

set -e

PROJECT_DIR="/opt/masterskey"

echo "Installing dependencies with memory optimizations..."

cd "$PROJECT_DIR"

# Check available memory
echo "Checking system memory..."
free -h

# Set Node.js memory limit (2GB)
export NODE_OPTIONS="--max-old-space-size=2048"

# Check if swap exists
SWAP_SIZE=$(free -m | grep Swap | awk '{print $2}')
if [ "$SWAP_SIZE" -eq 0 ]; then
    echo ""
    echo "⚠️  No swap space detected!"
    echo "   For better reliability, set up swap space:"
    echo "   sudo bash deployment-scripts/setup-swap.sh"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install with optimizations
echo ""
echo "Installing dependencies..."
echo "  - Using Node.js memory limit: 2GB"
echo "  - Network concurrency: 1 (reduces memory usage)"
echo ""

# Try yarn install with memory optimizations
yarn install --network-concurrency 1 --frozen-lockfile || {
    echo ""
    echo "❌ Installation failed!"
    echo ""
    echo "Try these solutions:"
    echo "1. Set up swap space: sudo bash deployment-scripts/setup-swap.sh"
    echo "2. Use npm instead: npm install"
    echo "3. Install in smaller batches (if using npm): npm install --prefer-offline"
    echo ""
    exit 1
}

echo ""
echo "✅ Dependencies installed successfully!"

