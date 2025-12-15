#!/bin/bash
# Complete server setup script for Master's Key deployment
# Run this script on a fresh Linux server (Ubuntu/Debian)

set -e

echo "=========================================="
echo "Master's Key Server Setup Script"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Update system
echo -e "${GREEN}Step 1: Updating system packages...${NC}"
apt update
apt upgrade -y

# Step 2: Install essential tools
echo -e "${GREEN}Step 2: Installing essential tools...${NC}"
apt install -y \
    curl \
    wget \
    git \
    build-essential \
    python3 \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Step 3: Install Node.js 20.x
echo -e "${GREEN}Step 3: Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    echo -e "${GREEN}✅ Node.js installed: $(node --version)${NC}"
else
    echo -e "${YELLOW}⚠️  Node.js already installed: $(node --version)${NC}"
fi

# Step 4: Install Yarn
echo -e "${GREEN}Step 4: Installing Yarn...${NC}"
if ! command -v yarn &> /dev/null; then
    npm install -g yarn
    echo -e "${GREEN}✅ Yarn installed: $(yarn --version)${NC}"
else
    echo -e "${YELLOW}⚠️  Yarn already installed: $(yarn --version)${NC}"
fi

# Step 5: Install PostgreSQL
echo -e "${GREEN}Step 5: Installing PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    apt install -y postgresql postgresql-contrib
    systemctl start postgresql
    systemctl enable postgresql
    echo -e "${GREEN}✅ PostgreSQL installed and started${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL already installed${NC}"
fi

# Step 6: Install nginx
echo -e "${GREEN}Step 6: Installing nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
    echo -e "${GREEN}✅ nginx installed and started${NC}"
else
    echo -e "${YELLOW}⚠️  nginx already installed${NC}"
fi

# Step 7: Create deployuser (if it doesn't exist)
echo -e "${GREEN}Step 7: Setting up deployuser...${NC}"
if ! id "deployuser" &>/dev/null; then
    useradd -m -s /bin/bash deployuser
    usermod -aG sudo deployuser
    echo -e "${GREEN}✅ Created deployuser${NC}"
    echo -e "${YELLOW}⚠️  Please set password for deployuser:${NC}"
    passwd deployuser
else
    echo -e "${YELLOW}⚠️  deployuser already exists${NC}"
fi

# Step 8: Set up SSH for deployuser
echo -e "${GREEN}Step 8: Setting up SSH directory for deployuser...${NC}"
mkdir -p /home/deployuser/.ssh
chmod 700 /home/deployuser/.ssh
chown deployuser:deployuser /home/deployuser/.ssh

# Step 9: Create project directory
echo -e "${GREEN}Step 9: Creating project directory...${NC}"
mkdir -p /opt/masterskey
chown deployuser:deployuser /opt/masterskey

# Step 10: Create web directory
echo -e "${GREEN}Step 10: Creating web directory...${NC}"
mkdir -p /var/www/masterskey/dist/apps/client
chown -R www-data:www-data /var/www/masterskey

# Step 11: Create uploads directory
echo -e "${GREEN}Step 11: Creating uploads directory...${NC}"
mkdir -p /opt/masterskey/uploads
chown -R deployuser:www-data /opt/masterskey/uploads
chmod -R 755 /opt/masterskey/uploads

# Step 12: Check memory and suggest swap setup
echo -e "${GREEN}Step 12: Checking system memory...${NC}"
RAM_GB=$(free -g | grep Mem | awk '{print $2}')
SWAP_SIZE=$(free -m | grep Swap | awk '{print $2}')

echo "  RAM: ${RAM_GB}GB"
echo "  Swap: ${SWAP_SIZE}MB"

if [ "$RAM_GB" -lt 2 ] || [ "$SWAP_SIZE" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Low memory detected or no swap space!${NC}"
    echo -e "${YELLOW}   For reliable dependency installation, set up swap space:${NC}"
    echo -e "${YELLOW}   sudo bash deployment-scripts/setup-swap.sh${NC}"
    echo ""
fi

echo ""
echo -e "${GREEN}=========================================="
echo "✅ Server setup complete!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Switch to deployuser: su - deployuser"
echo "2. Set up SSH key for GitHub: ssh-keygen -t ed25519"
echo "3. Add SSH key to GitHub account"
echo "4. Clone repository: cd /opt && git clone git@github.com/mkhib/kickzone.git masterskey"
echo "5. Run database setup: sudo bash deployment-scripts/setup-postgres.sh"
echo "6. Create .env file with database credentials"
echo "7. Build and deploy: sudo bash deployment-scripts/quick-deploy.sh"
echo ""

