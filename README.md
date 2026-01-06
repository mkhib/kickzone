## Master’s Key / Kickzone – Deployment & Operations Overview

This repository contains the **Master’s Key backend API (NestJS/Nx)** and the **three React frontends**:

- **Admins panel** – `apps/client/admins`
- **Sellers panel** – `apps/client/sellers`
- **Customers site** – `apps/client/customers`
- **API (NestJS)** – `apps/kickzone-api`

The goal of this README is to be your **GitHub home page and operations cheat‑sheet**: how to **deploy from scratch** and how to **update an existing server**. All detailed step‑by‑step docs are linked below.

---

## Quick Links – Most Important Docs

- **Complete deployment (from zero)**: [`COMPLETE_DEPLOYMENT_GUIDE.md`](COMPLETE_DEPLOYMENT_GUIDE.md)
- **Short deployment guide / scripts overview**: [`DEPLOYMENT_README.md`](DEPLOYMENT_README.md)
- **Day‑to‑day server & frontend updates (build on Windows, copy to server)**: [`SERVER_UPDATE_GUIDE.md`](SERVER_UPDATE_GUIDE.md)
- **Environment variables reference**: [`ENV_VARIABLES.md`](ENV_VARIABLES.md)
- **Deployment scripts reference**: [`deployment-scripts/README.md`](deployment-scripts/README.md)
- **Windows one‑click frontend deploy script**: [`deployment-scripts/windows-deploy-client.bat`](deployment-scripts/windows-deploy-client.bat)
- **Production checklist & security**: [`PRODUCTION_READINESS_CHECKLIST.md`](PRODUCTION_READINESS_CHECKLIST.md), [`SECURITY_CHANGES.md`](SECURITY_CHANGES.md)

If you are unsure where to start, read **`DEPLOYMENT_README.md` first**, then come back here for the update commands.

---

## 1. First‑Time Deployment (New Server)

For a completely fresh Linux server, the high‑level flow is:

1. **Initial server bootstrap**

   - **On the server**:
   - `sudo bash deployment-scripts/setup-server.sh`
   - Installs Node 20, Yarn, PostgreSQL, nginx, Git, build tools, swap (etc.).

2. **Git + repo setup**

   - Generate an SSH key for `deployuser` and add it to GitHub (see [`DEPLOYMENT_README.md`](DEPLOYMENT_README.md) or [`COMPLETE_DEPLOYMENT_GUIDE.md`](COMPLETE_DEPLOYMENT_GUIDE.md)).
   - Clone to `/opt/masterskey`:
     - `cd /opt`
     - `sudo git clone git@github.com:mkhib/kickzone.git masterskey`
     - `sudo chown -R deployuser:deployuser /opt/masterskey`

3. **Database + environment**

   - Run database setup script:
     - `sudo bash deployment-scripts/setup-postgres.sh`
   - Create `/opt/masterskey/.env` (see [`ENV_VARIABLES.md`](ENV_VARIABLES.md) for all options).

4. **Initial build and deploy (one command)**

   - **On the server**:
   - `cd /opt/masterskey`
   - `sudo bash deployment-scripts/quick-deploy.sh`
   - This will:
     - Install dependencies
     - Build the API and all React apps
     - Set up the `masterskey-api` systemd service
     - Copy frontend builds into `/var/www/masterskey/dist/apps/client`
     - Reload nginx

5. **Verify**
   - Check services:
     - `sudo systemctl status masterskey-api`
     - `sudo systemctl status nginx`
     - `sudo systemctl status postgresql`
   - Hit the apps:
     - Admin: `https://admins.masterskey.store`
     - Seller: `https://seller.masterskey.store`
     - Customer: `https://masterskey.store`

For full detail (every command explained), see **`COMPLETE_DEPLOYMENT_GUIDE.md`**.

---

## 2. Updating an Existing Server (Recommended Daily Flow)

There are **two main ways** to update production after you’ve already deployed at least once:

- **Option A – Build directly on the Linux server** (simple, but uses server CPU/RAM).
- **Option B – Build on your Windows PC and copy artifacts to the server** (recommended; documented in detail in `SERVER_UPDATE_GUIDE.md`).

### 2.1 Option A – Build & Deploy Directly on the Server

On the Linux server (`/opt/masterskey`):

```bash
cd /opt/masterskey

# 1) Pull latest code and install any new deps
git pull origin master   # or main
yarn install

# 2) Build API and React apps
yarn nx build kickzone-api --configuration=production
yarn nx build kickzone-admins --configuration=production
yarn nx build kickzone-sellers --configuration=production
yarn nx build kickzone-customers --configuration=production

# 3) Deploy React builds to nginx web root
sudo cp -r dist/apps/client/* /var/www/masterskey/dist/apps/client/
sudo chown -R www-data:www-data /var/www/masterskey

# 4) Restart API and reload nginx
sudo systemctl restart masterskey-api
sudo systemctl reload nginx
```

This flow is also scripted in `deployment-scripts/update-and-rebuild.sh` (see `DEPLOYMENT_README.md`).

### 2.2 Option B – Build on Windows and Copy to Server (Recommended)

**Code on Windows** is assumed at `E:\kickzone`. Full details with screenshots and notes are in **`SERVER_UPDATE_GUIDE.md`**. Summary:

- **Back‑end API update**

  - On Windows (`E:\kickzone`):
    - `yarn install` (only when dependencies change)
    - `yarn nx build kickzone-api --configuration=production`
  - Copy the built API to the server using PuTTY `pscp` (session `fat2`):
    - `pscp dist\apps\kickzone-api\main.js fat2:/opt/masterskey/apps/kickzone-api/`
    - `pscp dist\apps\kickzone-api\main.js.map fat2:/opt/masterskey/apps/kickzone-api/`
    - If present: `pscp -r dist\apps\kickzone-api\assets fat2:/opt/masterskey/apps/kickzone-api/`
  - On the server:
    - `sudo chown -R www-data:www-data /opt/masterskey/apps/kickzone-api`
    - `sudo systemctl restart masterskey-api`

- **Frontends (admins / sellers / customers) update**
  - On Windows:
    - `yarn install` (if needed)
    - `yarn nx build kickzone-admins --configuration=production`
    - `yarn nx build kickzone-sellers --configuration=production`
    - `yarn nx build kickzone-customers --configuration=production`
  - Upload with `pscp`:
    - `pscp -r dist\apps\client\* fat2:/var/www/masterskey/dist/apps/client/`
  - On the server:
    - `sudo chown -R www-data:www-data /var/www/masterskey`
    - `sudo chmod -R 755 /var/www/masterskey`
    - `sudo nginx -t`
    - `sudo systemctl reload nginx`

For the **full walkthrough, troubleshooting, and admin user creation steps**, always refer to **`SERVER_UPDATE_GUIDE.md`**.

---

## 3. Helpful Scripts

- **Linux deployment scripts** (run on server):

  - `deployment-scripts/setup-server.sh` – Install Node, Yarn, PostgreSQL, nginx, Git, swap; base hardening.
  - `deployment-scripts/setup-postgres.sh` – Create `masterskey_db` + DB user.
  - `deployment-scripts/setup-api-service.sh` – Create and configure the `masterskey-api` systemd service.
  - `deployment-scripts/quick-deploy.sh` – One‑shot “from scratch” deploy: build API + apps, configure service, deploy.
  - `deployment-scripts/update-and-rebuild.sh` – Pull, rebuild API + apps, copy frontend, restart/reload.
  - `deployment-scripts/deploy-apps.sh` – Only (re)build and deploy React apps.
  - `deployment-scripts/install-dependencies-safe.sh` & `setup-swap.sh` – Deal with low‑RAM servers and `yarn install` issues.

- **Windows script for frontends**:
  - `deployment-scripts/windows-deploy-client.bat`
    - Builds all three React apps with `yarn nx build ...`
    - Uses `pscp` (PuTTY session `fat2`) to upload `dist\apps\client\*` to `/var/www/masterskey/dist/apps/client/`
    - Prints the exact server‑side commands to fix permissions and reload nginx

See [`deployment-scripts/README.md`](deployment-scripts/README.md) for the full description of each script.

---

## 4. Environment, Structure, and Services

- **Environment variables**: see [`ENV_VARIABLES.md`](ENV_VARIABLES.md) for all options and recommended `.env` values.
- **Vite client envs**: frontends embed `VITE_*` keys at build time. Add `VITE_API_BASE_URL` (e.g., `https://masterskey.store`) and `VITE_GRAPHQL_ENDPOINT` (e.g., `https://masterskey.store/graphql`) to `.env.production` (and `.env.development` for local). Keep `.env` for shared defaults; override per-environment files or CI env vars during builds.
- **Server paths (production)**:
  - Project root: `/opt/masterskey`
  - API build (NestJS): `/opt/masterskey/apps/kickzone-api/dist/main.js` (or `/opt/masterskey/apps/kickzone-api/main.js` when copied from Windows)
  - Uploads: `/opt/masterskey/uploads`
  - Frontend web root (nginx): `/var/www/masterskey/dist/apps/client`
- **Key services**:
  - API: `masterskey-api` (`sudo systemctl status masterskey-api`)
  - Database: `postgresql`
  - Web server: `nginx`

For a deeper dive into production‑hardening, see **`PRODUCTION_READINESS_CHECKLIST.md`** and **`SECURITY_CHANGES.md`**.

---

## 5. Additional Topic‑Specific Guides

These guides live in the repo and cover specific areas:

- **Authentication & redirects**: [`AUTHENTICATION_REDIRECT_GUIDE.md`](AUTHENTICATION_REDIRECT_GUIDE.md)
- **Translations & LibreTranslate**: [`LIBRETRANSLATE_SETUP.md`](LIBRETRANSLATE_SETUP.md), [`TRANSLATION_DEBUGGING.md`](TRANSLATION_DEBUGGING.md), [`TRANSLATION_LOGS_GUIDE.md`](TRANSLATION_LOGS_GUIDE.md)
- **Multi‑currency & shipping**: [`MULTI_CURRENCY_IMPLEMENTATION.md`](MULTI_CURRENCY_IMPLEMENTATION.md), [`CURRENCY_MANAGEMENT_UPDATES.md`](CURRENCY_MANAGEMENT_UPDATES.md), [`SHIPPING_STRATEGY.md`](SHIPPING_STRATEGY.md)
- **UI/theming & RTL/glassmorphism fixes**:  
  [`ANIMATED_GRADIENT_GLASSMORPHISM_GUIDE.md`](ANIMATED_GRADIENT_GLASSMORPHISM_GUIDE.md),  
  [`ANIMATED_GRADIENT_RTL_SOLUTION.md`](ANIMATED_GRADIENT_RTL_SOLUTION.md),  
  [`GLASSMORPHISM_THEME_GUIDE.md`](GLASSMORPHISM_THEME_GUIDE.md),  
  [`RTL_GLASSMORPHISM_FIX.md`](RTL_GLASSMORPHISM_FIX.md),  
  [`LANGUAGE_SETTINGS_GLASSMORPHISM_FIX.md`](LANGUAGE_SETTINGS_GLASSMORPHISM_FIX.md)
- **Nginx, SSL, and subdomains**:  
  [`DEPLOYMENT_SUBDOMAINS.md`](DEPLOYMENT_SUBDOMAINS.md),  
  `nginx-fat-mkstudio.conf`, `nginx-fat2-mkstudio.conf`, `nginx-ssl-complete.conf`, `nginx.conf.example`, and renewal configs in `renewal-configs/`.

Use this README as the **entry point**, then jump into the specific markdown files for detailed, copy‑paste‑ready commands.
