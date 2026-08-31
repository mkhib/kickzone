#!/bin/bash
# Post-deploy steps on the Linux server after CI uploads build artifacts.
# Run via GitHub Actions SSH step or manually after copying dist/ to the server.
#
# Note: CI runs a prepare step before SCP that chowns deploy targets to deployuser,
# because this script sets www-data ownership for the API service and nginx.

set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/masterskey}"
WEB_DIR="${WEB_DIR:-/var/www/masterskey/dist/apps/client}"
API_DIR="${API_DIR:-/opt/masterskey/apps/kickzone-api}"
API_SERVICE="${API_SERVICE:-masterskey-api}"

echo "Post-deploy: fixing permissions and restarting services..."

sudo chown -R www-data:www-data "$API_DIR"
sudo chmod -R 755 "$API_DIR"
sudo chown -R www-data:www-data /var/www/masterskey
sudo chmod -R 755 /var/www/masterskey

if [ -f "$PROJECT_DIR/package.json" ] && [ -f "$PROJECT_DIR/yarn.lock" ]; then
  echo "Installing production API dependencies..."
  cd "$PROJECT_DIR"
  sudo -u deployuser yarn install --production --ignore-scripts || true
fi

sudo systemctl restart "$API_SERVICE"
sleep 2

if sudo systemctl is-active --quiet "$API_SERVICE"; then
  echo "API service ($API_SERVICE) is running"
else
  echo "WARNING: $API_SERVICE may have failed — check: sudo journalctl -u $API_SERVICE -n 50"
fi

sudo nginx -t
sudo systemctl reload nginx

echo "Post-deploy complete."
echo "  API:  $API_DIR"
echo "  Web:  $WEB_DIR"
