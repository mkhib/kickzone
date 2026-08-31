#!/bin/bash
# Let's Encrypt SSL for saintbala.com (DNS-only / gray-cloud Cloudflare).
# Prerequisites:
#   - Cloudflare A records are DNS only (gray cloud), pointing to this server
#   - nginx HTTP vhosts already configured (nginx-saintbala.conf)
#   - Port 80 and 443 open (ufw + provider firewall)
#
# Usage:
#   sudo CERTBOT_EMAIL=you@example.com bash deployment-scripts/setup-ssl-saintbala.sh

set -euo pipefail

if [ "$EUID" -ne 0 ]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

EMAIL="${CERTBOT_EMAIL:-}"
if [ -z "$EMAIL" ]; then
  echo "Set your email for Let's Encrypt expiry notices:"
  echo "  sudo CERTBOT_EMAIL=you@example.com bash $0"
  exit 1
fi

DOMAINS=(
  saintbala.com
  www.saintbala.com
  admins.saintbala.com
  seller.saintbala.com
)

echo "=== Installing certbot ==="
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y certbot python3-certbot-nginx

echo ""
echo "=== Checking DNS resolves to this server ==="
SERVER_IP="$(hostname -I | awk '{print $1}')"
echo "This server IP: $SERVER_IP"
for d in "${DOMAINS[@]}"; do
  RESOLVED="$(getent ahosts "$d" 2>/dev/null | awk '/STREAM/ {print $1; exit}')"
  if [ -z "$RESOLVED" ]; then
    echo "WARNING: $d does not resolve yet — wait for DNS propagation"
  elif [ "$RESOLVED" != "$SERVER_IP" ]; then
    echo "WARNING: $d resolves to $RESOLVED (expected $SERVER_IP)"
    echo "         If Cloudflare proxy is ON, turn it OFF (DNS only / gray cloud)"
  else
    echo "OK: $d -> $RESOLVED"
  fi
done

echo ""
echo "=== Requesting certificate and configuring nginx HTTPS ==="
DOMAIN_ARGS=()
for d in "${DOMAINS[@]}"; do
  DOMAIN_ARGS+=(-d "$d")
done

certbot --nginx \
  "${DOMAIN_ARGS[@]}" \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --redirect \
  --hsts \
  --staple-ocsp

nginx -t
systemctl reload nginx

echo ""
echo "=== SSL setup complete ==="
echo "Sites should now redirect HTTP -> HTTPS:"
for d in "${DOMAINS[@]}"; do
  echo "  https://$d"
done
echo ""
echo "Certificate auto-renewal is handled by certbot.timer"
systemctl is-active certbot.timer && echo "certbot.timer: active" || true
echo ""
echo "Test renewal (dry run):"
echo "  sudo certbot renew --dry-run"
