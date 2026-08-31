#!/bin/bash
set -euo pipefail
APPEND_FILE="${1:-/root/kickzone-env-append.env}"
ENV_FILE="/opt/masterskey/.env"
if [ -f "$APPEND_FILE" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    [ -z "$line" ] && continue
    [[ "$line" =~ ^# ]] && continue
    key="${line%%=*}"
    if ! grep -q "^${key}=" "$ENV_FILE" 2>/dev/null; then
      echo "$line" >> "$ENV_FILE"
    fi
  done < "$APPEND_FILE"
  rm -f "$APPEND_FILE"
fi
chown www-data:www-data "$ENV_FILE"
chmod 600 "$ENV_FILE"
chown -R www-data:www-data /opt/masterskey/apps/kickzone-api /var/www/masterskey /opt/masterskey/uploads
chmod -R 755 /opt/masterskey/apps/kickzone-api
systemctl restart masterskey-api
sleep 2
systemctl reload nginx
