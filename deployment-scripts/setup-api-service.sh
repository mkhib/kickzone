#!/bin/bash
# Script to set up the API as a systemd service

set -e

echo "Setting up Kickzone API as a systemd service..."

# Get the project directory
PROJECT_DIR="/opt/kickzone"
SERVICE_USER="www-data"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Project directory $PROJECT_DIR does not exist!"
    echo "Please clone your repository to $PROJECT_DIR first"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# Find node binary
NODE_BIN=$(which node)

# Check if .env file exists
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo "⚠️  Warning: .env file not found at $PROJECT_DIR/.env"
    echo "Please create it with database credentials and other settings"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create uploads directory
mkdir -p "$PROJECT_DIR/uploads"
chown -R $SERVICE_USER:$SERVICE_USER "$PROJECT_DIR/uploads"
chmod -R 755 "$PROJECT_DIR/uploads"

# Create systemd service file
SERVICE_FILE="/etc/systemd/system/kickzone-api.service"
cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=Kickzone API Server
After=network.target postgresql.service

[Service]
Type=simple
User=$SERVICE_USER
Group=$SERVICE_USER
WorkingDirectory=$PROJECT_DIR
EnvironmentFile=$PROJECT_DIR/.env
Environment=NODE_ENV=production
ExecStart=$NODE_BIN $PROJECT_DIR/apps/kickzone-api/dist/main.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

# Security settings
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

echo "Service file created at $SERVICE_FILE"

# Set permissions
chown root:root "$SERVICE_FILE"
chmod 644 "$SERVICE_FILE"

# Set project directory permissions
chown -R $SERVICE_USER:$SERVICE_USER "$PROJECT_DIR/apps/kickzone-api/dist" 2>/dev/null || true
chown -R $SERVICE_USER:$SERVICE_USER "$PROJECT_DIR/uploads"
chmod 755 "$PROJECT_DIR"
chmod 600 "$PROJECT_DIR/.env" 2>/dev/null || true

# Reload systemd
systemctl daemon-reload

# Enable service
systemctl enable kickzone-api

echo ""
echo "✅ Service created and enabled!"
echo ""
echo "To start the service:"
echo "  sudo systemctl start kickzone-api"
echo ""
echo "To check status:"
echo "  sudo systemctl status kickzone-api"
echo ""
echo "To view logs:"
echo "  sudo journalctl -u kickzone-api -f"
echo ""
echo "⚠️  Make sure you have:"
echo "  1. Built the API: nx build kickzone-api --configuration=production"
echo "  2. Created .env file with database credentials"
echo "  3. PostgreSQL is running and database is created"


