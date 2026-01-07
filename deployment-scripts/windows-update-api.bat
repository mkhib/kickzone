@echo off
REM ==========================================================
REM Master's Key - Windows API Build & Update Script
REM ----------------------------------------------------------
REM - Builds kickzone-api on Windows
REM - Uploads built files to the Linux server via pscp (PuTTY session: fat2)
REM - Runs post-upload commands as deployuser (via plink) to fix perms and restart API
REM
REM Requirements:
REM - yarn, node, nx available on PATH
REM - PuTTY installed (pscp.exe / plink.exe in PATH)
REM - Saved PuTTY session named "fat2" that uses deployuser
REM - /opt/masterskey/apps/kickzone-api writable by deployuser (or via sudo)
REM ==========================================================

SETLOCAL ENABLEDELAYEDEXPANSION

REM Change to repo root (this script lives in deployment-scripts\)
cd /d "%~dp0.."

echo.
echo ==========================================
echo  Master's Key - Build ^& Update API
echo ==========================================
echo.

REM 1) Install dependencies
echo [1/3] Installing dependencies (yarn install)...
call yarn install
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: yarn install failed.
  goto :EOF
)

REM 2) Build API
echo.
echo [2/3] Building API...
call yarn nx build kickzone-api --configuration=production
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: Build failed for kickzone-api.
  goto :EOF
)

IF NOT EXIST "dist\apps\kickzone-api" (
  echo ERROR: dist\apps\kickzone-api not found.
  goto :EOF
)

REM 3) Upload dist + package manifests to server via pscp (PuTTY session: fat2)
echo.
echo [3/4] Uploading API build to server via pscp (session: fat2)...
echo   pscp -batch -r dist\apps\kickzone-api\* fat2:/opt/masterskey/apps/kickzone-api/
pscp -batch -r dist\apps\kickzone-api\* fat2:/opt/masterskey/apps/kickzone-api/
IF ERRORLEVEL 1 (
  echo ERROR: pscp upload failed.
  goto :EOF
)

REM Upload package.json / yarn.lock so server installs new deps
echo   pscp -batch package.json yarn.lock fat2:/opt/masterskey/
pscp -batch package.json yarn.lock fat2:/opt/masterskey/
IF ERRORLEVEL 1 (
  echo ERROR: pscp upload of package.json/yarn.lock failed.
  goto :EOF
)

REM 4) Post-upload server steps (install deps + perms + service restart) as deployuser
echo.
echo Running post-upload commands via plink (session: fat2)...
plink -batch -load fat2 ^
  "cd /opt/masterskey && sudo -u deployuser yarn install --production --ignore-scripts && sudo chown -R www-data:www-data /opt/masterskey/apps/kickzone-api && sudo chmod -R 755 /opt/masterskey/apps/kickzone-api && sudo systemctl restart masterskey-api && sudo systemctl status --no-pager masterskey-api && sudo nginx -t && sudo systemctl reload nginx"
IF ERRORLEVEL 1 (
  echo ERROR: Remote post-upload steps failed.
  goto :EOF
)

echo.
echo ==========================================
echo  API update complete
echo ==========================================
echo.
echo Uploaded: API build + package.json/yarn.lock
echo Service: masterskey-api restarted and status checked
echo nginx reloaded after config test
echo.
echo Press any key to close this window...
pause >nul

ENDLOCAL
exit /b 0

