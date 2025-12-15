#!/bin/bash
# Script to set up PostgreSQL database for Master's Key

set -e

echo "Setting up PostgreSQL database for Master's Key..."

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Installing..."
    apt update
    apt install -y postgresql postgresql-contrib
fi

# Start PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Get database credentials
read -p "Enter database name [masterskey_db]: " DB_NAME
DB_NAME=${DB_NAME:-masterskey_db}

read -p "Enter database user [masterskey_user]: " DB_USER
DB_USER=${DB_USER:-masterskey_user}

read -sp "Enter database password: " DB_PASSWORD
echo ""

if [ -z "$DB_PASSWORD" ]; then
    echo "Error: Password cannot be empty"
    exit 1
fi

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql <<EOF
-- Create database
CREATE DATABASE $DB_NAME;

-- Create user
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
ALTER USER $DB_USER CREATEDB;

-- Exit
\q
EOF

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Database credentials:"
echo "  DB_NAME: $DB_NAME"
echo "  DB_USER: $DB_USER"
echo "  DB_PASSWORD: [hidden]"
echo ""
echo "Add these to your .env file:"
echo "  DB_HOST=localhost"
echo "  DB_PORT=5432"
echo "  DB_USERNAME=$DB_USER"
echo "  DB_PASSWORD=$DB_PASSWORD"
echo "  DB_NAME=$DB_NAME"
echo ""


