## Master's Key – Server & Frontend Update Guide

This guide explains **how to update the API and React panels** after you’ve already deployed everything once.

It assumes:

- Code repo is cloned on your **Windows PC** at `E:\kickzone`
- Server code is at `/opt/masterskey` on your **Linux server**
- API service name is `masterskey-api`
- Web root (served by nginx) is `/var/www/masterskey/dist/apps/client`

---

## 1. Paths & Services Overview

- **Project root (server)**: `/opt/masterskey`
- **API app (server)**: `/opt/masterskey/apps/kickzone-api`
- **Uploads (images, etc.)**: `/opt/masterskey/uploads`
- **React apps (server)**:
  - Admin: `/var/www/masterskey/dist/apps/client/admins`
  - Seller: `/var/www/masterskey/dist/apps/client/sellers`
  - Customer: `/var/www/masterskey/dist/apps/client/customers`
- **API systemd service**: `masterskey-api`
  - Config: `/etc/systemd/system/masterskey-api.service`
  - Runs: `ExecStart=/usr/bin/node /opt/masterskey/apps/kickzone-api/main.js`

---

## 2. Updating the API (Backend)

You **always build on your Windows PC** (to avoid server CPU/RAM limits), then copy the built files to the server.

### 2.1 Build API on Windows

On your Windows PC, in `E:\kickzone`:

```bash
cd /e/kickzone

# Make sure dependencies are installed (only needed after changes to package.json / yarn.lock)
yarn install

# Build API in production mode
yarn nx build kickzone-api --configuration=production
```

After a successful build, you will have:

- `E:\kickzone\dist\apps\kickzone-api\main.js`
- `E:\kickzone\dist\apps\kickzone-api\main.js.map`
- `E:\kickzone\dist\apps\kickzone-api\assets\` (if present)

> Note: The webpack config outputs into the global Nx `dist` folder: `dist/apps/kickzone-api`.

### 2.2 Copy API build to the server (using `pscp` and PuTTY session `fat2`)

From your Windows PC, use PuTTY’s `pscp` with your saved session **`fat2`** to copy the **built** files from `dist\apps\kickzone-api` into the app folder on the server:

```bash
cd /e/kickzone

# Copy main.js and source map
pscp dist\apps\kickzone-api\main.js fat2:/opt/masterskey/apps/kickzone-api/
pscp dist\apps\kickzone-api\main.js.map fat2:/opt/masterskey/apps/kickzone-api/

# If there is an assets folder:
pscp -r dist\apps\kickzone-api\assets fat2:/opt/masterskey/apps/kickzone-api/
```

### 2.3 Fix permissions on the server

SSH into the server:

```bash
ssh deployuser@eng20

cd /opt/masterskey/apps
sudo chown -R www-data:www-data kickzone-api
```

This ensures the `masterskey-api` service (running as `www-data`) can read the files.

### 2.4 Restart the API service

```bash
sudo systemctl restart masterskey-api
sudo systemctl status masterskey-api
```

If there’s an error, see logs:

```bash
sudo journalctl -u masterskey-api -n 50
```

When it’s working, you should see something like:

```text
🚀 Application is running on: http://localhost:4000/api
```

---

## 3. Updating the React Apps (Admins, Sellers, Customers)

Again, builds happen on your **Windows PC**, then you copy the static files to the server.

### 3.1 Build React apps on Windows

On your Windows PC:

```bash
cd /e/kickzone

# Make sure dependencies are installed (if not already)
yarn install

# Build admin, seller, and customer apps
yarn nx build kickzone-admins --configuration=production
yarn nx build kickzone-sellers --configuration=production
yarn nx build kickzone-customers --configuration=production
```

You should now have:

- `E:\kickzone\dist\apps\client\admins\...`
- `E:\kickzone\dist\apps\client\sellers\...`
- `E:\kickzone\dist\apps\client\customers\...`
- Optionally other library builds under `E:\kickzone\dist\libs\...` (e.g. `dist\libs\shared\codegen`) – these are not needed on the server for runtime.

### 3.2 Copy builds to the server (using `pscp` and PuTTY session `fat2`)

From your Windows PC:

```bash
cd /e/kickzone

# Copy all client builds at once
pscp -r dist\apps\client\* fat2:/var/www/masterskey/dist/apps/client/
```

To update **only one app**, you can instead do:

```bash
# Admin only
pscp -r dist\apps\client\admins fat2:/var/www/masterskey/dist/apps/client/

# Seller only
pscp -r dist\apps\client\sellers fat2:/var/www/masterskey/dist/apps/client/

# Customer only
pscp -r dist\apps\client\customers fat2:/var/www/masterskey/dist/apps/client/
```

### 3.3 Fix permissions and reload nginx

On the server:

```bash
ssh deployuser@eng20

sudo chown -R www-data:www-data /var/www/masterskey
sudo chmod -R 755 /var/www/masterskey

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

Now your panels should be available at:

- Admin: `https://admins.masterskey.store`
- Seller: `https://seller.masterskey.store`
- Customer: `https://masterskey.store`

---

## 4. Creating / Updating an Admin User

The system uses **bcrypt** to hash passwords. Never insert a plain-text password directly into the database.

There are two safe ways:

1. Use the **GraphQL API** to create a user (password hashed automatically), then change their role to `ADMIN` in the database.
2. Generate a bcrypt hash yourself, then insert/update the user in PostgreSQL with that hash.

### 4.1 Option A – Create user via GraphQL, then promote to ADMIN

1. Open GraphQL Playground in your browser (admin panel domain):

   - `https://admins.masterskey.store/graphql`

2. Run this mutation to create a user (this will create a **CUSTOMER** with a hashed password):

```graphql
mutation {
  createUser(createUserInput: { name: "Admin", lastName: "User", username: "admin", email: "admin@masterskey.store", password: "StrongAdminPassword123!", role: ADMIN }) {
    id
    email
    role
  }
}
```

> Important: Even though we pass `role: ADMIN` here, the current implementation uses `AuthService.register`, which always sets the role to `CUSTOMER`. That’s fine—we will promote the user via SQL.

3. In PostgreSQL, update that user’s role to ADMIN:

```bash
sudo -u postgres psql
```

Then in `psql`:

```sql
\c masterskey_db

UPDATE "user"
SET role = 'ADMIN'
WHERE email = 'admin@masterskey.store';

-- Optional: verify
SELECT id, email, role FROM "user" WHERE email = 'admin@masterskey.store';

\q
```

4. Now you can log into the **admin panel** with:

- Email: `admin@masterskey.store`
- Password: `StrongAdminPassword123!` (or whatever you used)

The password hash is correct because the API handled hashing via `bcrypt` in `AuthService.register`.

### 4.2 Option B – Generate bcrypt hash yourself (advanced)

If you prefer to create an admin entirely via SQL, you must hash the password first. On your Windows PC (in `E:\kickzone`):

```bash
cd /e/kickzone
node -e "console.log(require('bcryptjs').hashSync('StrongAdminPassword123!', 10))"
```

Copy the printed hash (a long string starting with `$2a$` or `$2b$`).

Then on the server:

```bash
sudo -u postgres psql
```

In `psql`:

```sql
\c masterskey_db

INSERT INTO "user" (
  name,
  "lastName",
  username,
  email,
  password,
  role,
  locale
) VALUES (
  'Admin',
  'User',
  'admin',
  'admin@masterskey.store',
  '<PASTE_BCRYPT_HASH_HERE>',
  'ADMIN',
  'en'
);

SELECT id, email, role FROM "user" WHERE email = 'admin@masterskey.store';

\q
```

Now the admin user exists with a properly hashed password.

---

## 5. Updating Environment Variables

If you ever need to change DB credentials, JWT secret, etc.:

```bash
sudo nano /opt/masterskey/.env
```

Typical content:

```bash
API_PORT=4000
NODE_ENV=production

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=masterskey_user
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=masterskey_db

JWT_SECRET=YOUR_VERY_SECRET_KEY
```

After editing:

```bash
sudo chmod 600 /opt/masterskey/.env
sudo chown www-data:www-data /opt/masterskey/.env
sudo systemctl restart masterskey-api
```

---

## 6. Quick Reference – Common Commands (Server)

```bash
# Check services
sudo systemctl status masterskey-api
sudo systemctl status nginx
sudo systemctl status postgresql

# Restart services
sudo systemctl restart masterskey-api
sudo systemctl restart nginx
sudo systemctl restart postgresql

# View logs
sudo journalctl -u masterskey-api -n 50
sudo tail -n 50 /var/log/nginx/error.log

# Database
sudo -u postgres psql -d masterskey_db
```

---

## 7. Troubleshooting Notes

### 7.1 curl to API returns “Empty reply from server”

Depending on how HTTPS is configured, the API may be listening with TLS. If you see:

```bash
curl -i http://localhost:4000/api
curl: (52) Empty reply from server
```

Try:

```bash
curl -ik https://localhost:4000/api
```

If that works, nginx should proxy with `https://localhost:4000`. If you later change the API to pure HTTP (no TLS in Nest), update nginx to use `http://localhost:4000` instead.

### 7.2 Database auth / permissions errors

If logs show `password authentication failed for user`:

1. Ensure `.env` DB settings match PostgreSQL user.
2. Reset password in PostgreSQL:

   ```bash
   sudo -u postgres psql
   ALTER USER masterskey_user WITH PASSWORD 'YOUR_DB_PASSWORD';
   \q
   ```

3. Restart API.

If logs show `permission denied for schema public`, run:

```sql
\c masterskey_db
GRANT USAGE, CREATE ON SCHEMA public TO masterskey_user;
ALTER SCHEMA public OWNER TO masterskey_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO masterskey_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO masterskey_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO masterskey_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO masterskey_user;
```

Then restart the API.

---

This guide should cover **day‑to‑day operations**:

- Build on Windows
- Copy builds to server
- Restart services
- Create and manage admin users safely with hashed passwords.
