#!/bin/bash
# Non-interactive first boot for saintbala.com (Cloudflare in front).
# Run as root on a fresh Ubuntu/Debian VPS after apt update/upgrade.
# Usage: sudo bash bootstrap-saintbala.sh

set -euo pipefail

if [ "$EUID" -ne 0 ]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

DOMAIN="saintbala.com"
PROJECT_DIR="/opt/masterskey"
WEB_DIR="/var/www/masterskey/dist/apps/client"
CRED_FILE="/root/saintbala-credentials.txt"

echo "=== SAINTBALA server bootstrap ==="

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl wget git build-essential python3 ca-certificates gnupg \
  ufw nginx postgresql postgresql-contrib openssl

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
if ! command -v yarn >/dev/null 2>&1; then
  npm install -g yarn
fi

if [ "$(free -m | awk '/Swap/ {print $2}')" -eq 0 ]; then
  echo "Creating 2G swap..."
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

if ! id deployuser >/dev/null 2>&1; then
  useradd -m -s /bin/bash deployuser
  usermod -aG sudo deployuser
fi
echo 'deployuser ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/deployuser
chmod 440 /etc/sudoers.d/deployuser

install -d -m 700 -o deployuser -g deployuser /home/deployuser/.ssh
if [ ! -f /home/deployuser/.ssh/id_ed25519 ]; then
  sudo -u deployuser ssh-keygen -t ed25519 -N '' -f /home/deployuser/.ssh/id_ed25519 -C "deployuser@${DOMAIN}"
fi
if [ ! -f /home/deployuser/.ssh/github-actions ]; then
  sudo -u deployuser ssh-keygen -t ed25519 -N '' -f /home/deployuser/.ssh/github-actions -C "github-actions@${DOMAIN}"
fi
cat /home/deployuser/.ssh/github-actions.pub >> /home/deployuser/.ssh/authorized_keys
chmod 600 /home/deployuser/.ssh/authorized_keys
chown deployuser:deployuser /home/deployuser/.ssh/authorized_keys

SSHD_CFG="/etc/ssh/sshd_config"
if grep -q '^AllowUsers ' "$SSHD_CFG"; then
  if ! grep '^AllowUsers ' "$SSHD_CFG" | grep -qw deployuser; then
    sed -i 's/^AllowUsers \(.*\)$/AllowUsers \1 deployuser/' "$SSHD_CFG"
  fi
else
  echo 'AllowUsers root deployuser' >> "$SSHD_CFG"
fi
sshd -t
systemctl reload sshd

mkdir -p "$PROJECT_DIR/apps/kickzone-api" "$PROJECT_DIR/uploads" \
  "$WEB_DIR/admins" "$WEB_DIR/sellers" "$WEB_DIR/customers"
chown -R deployuser:deployuser "$PROJECT_DIR"
chown -R deployuser:www-data "$PROJECT_DIR/uploads"
chmod -R 775 "$PROJECT_DIR/uploads"
chown -R www-data:www-data /var/www/masterskey

systemctl enable --now postgresql
DB_NAME=saintbala_db
DB_USER=saintbala_user
if [ -f "$CRED_FILE" ]; then
  # shellcheck disable=SC1090
  source "$CRED_FILE"
else
  DB_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-24)"
  JWT_SECRET="$(openssl rand -base64 48)"
fi

sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
SELECT 'CREATE DATABASE ${DB_NAME}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
  ELSE
    ALTER USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
  END IF;
END
\$\$;
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};
SQL
sudo -u postgres psql -d "$DB_NAME" -v ON_ERROR_STOP=1 <<SQL
GRANT USAGE, CREATE ON SCHEMA public TO ${DB_USER};
ALTER SCHEMA public OWNER TO ${DB_USER};
SQL

cat > "$PROJECT_DIR/.env" <<EOF
NODE_ENV=production
API_PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
JWT_SECRET=${JWT_SECRET}
SALT_ROUNDS=12
ALLOWED_ORIGINS=https://saintbala.com,https://www.saintbala.com,https://admins.saintbala.com,https://seller.saintbala.com
SELLERS_FRONTEND_URL=https://seller.saintbala.com
VITE_GRAPHQL_ENDPOINT=/graphql
VITE_API_BASE_URL=https://saintbala.com
EOF
chmod 600 "$PROJECT_DIR/.env"
chown www-data:www-data "$PROJECT_DIR/.env"

cat > "$CRED_FILE" <<EOF
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
JWT_SECRET=${JWT_SECRET}
EOF
chmod 600 "$CRED_FILE"

NODE_BIN="$(command -v node)"
cat > /etc/systemd/system/masterskey-api.service <<EOF
[Unit]
Description=SAINTBALA API Server
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=${PROJECT_DIR}
EnvironmentFile=${PROJECT_DIR}/.env
Environment=NODE_ENV=production
ExecStart=${NODE_BIN} ${PROJECT_DIR}/apps/kickzone-api/main.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable masterskey-api

for app in admins sellers customers; do
  cat > "$WEB_DIR/$app/index.html" <<HTML
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>SAINTBALA</title></head>
<body style="font-family:sans-serif;padding:2rem">
<h1>SAINTBALA</h1>
<p>Origin is up. Deploy the built app next.</p>
</body></html>
HTML
done
chown -R www-data:www-data /var/www/masterskey

if [ -f "$PROJECT_DIR/nginx-saintbala.conf" ]; then
  cp "$PROJECT_DIR/nginx-saintbala.conf" /etc/nginx/sites-available/saintbala.com
else
  echo "WARNING: nginx-saintbala.conf not in $PROJECT_DIR yet — writing a stub HTTP vhost."
  cat > /etc/nginx/sites-available/saintbala.com <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name saintbala.com www.saintbala.com admins.saintbala.com seller.saintbala.com;
    root /var/www/masterskey/dist/apps/client/customers;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    location /api { proxy_pass http://127.0.0.1:4000; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }
    location /graphql { proxy_pass http://127.0.0.1:4000/graphql; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }
    location /uploads/ { alias /opt/masterskey/uploads/; }
}
NGINX
fi
ln -sfn /etc/nginx/sites-available/saintbala.com /etc/nginx/sites-enabled/saintbala.com
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable --now nginx
systemctl reload nginx

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "=== Bootstrap finished ==="
echo "Node: $(node -v)  Yarn: $(yarn -v)  nginx: $(nginx -v 2>&1)"
echo "DB credentials: $CRED_FILE"
echo ""
echo "GitHub Actions SSH public key (add private key as SSH_PRIVATE_KEY secret):"
cat /home/deployuser/.ssh/github-actions.pub
echo ""
echo "GitHub Actions private key (paste into GitHub secret SSH_PRIVATE_KEY):"
echo "----- file: /home/deployuser/.ssh/github-actions -----"
cat /home/deployuser/.ssh/github-actions
echo ""
echo "Cloudflare DNS (DNS only / gray cloud — NOT proxied) — A records:"
SERVER_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
if [ -z "$SERVER_IP" ]; then
  SERVER_IP="YOUR_SERVER_IP"
fi
echo "  A     @                 $SERVER_IP"
echo "  A     www               $SERVER_IP"
echo "  A     admins            $SERVER_IP"
echo "  A     seller            $SERVER_IP"
echo "SSL/TLS: run setup-ssl-saintbala.sh after DNS propagates (Let's Encrypt on this server)"
echo ""
echo "API will start after you upload dist/apps/kickzone-api/main.js"
echo "  sudo systemctl start masterskey-api"
echo "  sudo journalctl -u masterskey-api -n 50"
