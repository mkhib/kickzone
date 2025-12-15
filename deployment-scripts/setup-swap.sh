#!/bin/bash
# Script to set up swap space for low-memory servers
# This helps prevent "Killed" errors during yarn install

set -e

echo "Setting up swap space..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Check current swap
CURRENT_SWAP=$(free -m | grep Swap | awk '{print $2}')

if [ "$CURRENT_SWAP" -gt 0 ]; then
    echo "✅ Swap space already exists: ${CURRENT_SWAP}MB"
    free -h
    exit 0
fi

# Get available RAM
RAM_GB=$(free -g | grep Mem | awk '{print $2}')
SWAP_SIZE_GB=$((RAM_GB * 2))  # 2x RAM size

# Cap at 4GB for swap
if [ "$SWAP_SIZE_GB" -gt 4 ]; then
    SWAP_SIZE_GB=4
fi

echo "Detected RAM: ${RAM_GB}GB"
echo "Creating ${SWAP_SIZE_GB}GB swap file..."

# Create swap file
SWAP_FILE="/swapfile"
fallocate -l ${SWAP_SIZE_GB}G "$SWAP_FILE" || dd if=/dev/zero of="$SWAP_FILE" bs=1M count=$((SWAP_SIZE_GB * 1024))

# Set correct permissions
chmod 600 "$SWAP_FILE"

# Set up swap
mkswap "$SWAP_FILE"
swapon "$SWAP_FILE"

# Make it permanent
if ! grep -q "$SWAP_FILE" /etc/fstab; then
    echo "$SWAP_FILE none swap sw 0 0" >> /etc/fstab
fi

echo ""
echo "✅ Swap space created successfully!"
echo ""
free -h
echo ""
echo "Swap file: $SWAP_FILE"
echo "Size: ${SWAP_SIZE_GB}GB"

