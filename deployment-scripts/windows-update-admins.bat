@echo off
REM ==========================================================
REM Master's Key - Windows Admin Panel Update Script
REM ----------------------------------------------------------
REM - Builds the admins React app on Windows
REM - Uploads the built files to the Linux server via pscp (PuTTY session: fat2)
REM - Runs post-upload commands as deployuser (via plink) to fix perms and reload nginx
REM
REM Requirements:
REM - yarn, node, nx available on PATH
REM - PuTTY installed (pscp.exe / plink.exe in PATH)
REM - Saved PuTTY session named "fat2" that uses deployuser
REM - /var/www/masterskey/dist/apps/client/admins writable by deployuser (or via sudo)
REM ==========================================================

SETLOCAL ENABLEDELAYEDEXPANSION

REM Change to repo root (this script lives in deployment-scripts\)
cd /d "%~dp0.."

echo.
echo ==========================================
echo  Master's Key - Update Admin Panel
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

REM 2) Build admin app
echo.
echo [2/3] Building admin app...
call yarn nx build kickzone-admins --configuration=production
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: Build failed for kickzone-admins.
  goto :EOF
)

IF NOT EXIST "dist\apps\client\admins" (
  echo ERROR: dist\apps\client\admins not found.
  goto :EOF
)

REM 3) Upload to server via pscp (PuTTY session: fat2)
echo.
echo [3/3] Uploading admin build to server via pscp (session: fat2)...
echo   pscp -batch -r dist\apps\client\admins fat2:/var/www/masterskey/dist/apps/client/
pscp -batch -r dist\apps\client\admins fat2:/var/www/masterskey/dist/apps/client/
IF ERRORLEVEL 1 (
  echo ERROR: pscp upload failed.
  goto :EOF
)

REM 4) Post-upload server steps (permissions + nginx reload) as deployuser
echo.
echo Running post-upload commands via plink (session: fat2)...
plink -batch -load fat2 ^
  "sudo chown -R www-data:www-data /var/www/masterskey && sudo chmod -R 755 /var/www/masterskey && sudo nginx -t && sudo systemctl reload nginx"
IF ERRORLEVEL 1 (
  echo ERROR: Remote post-upload steps failed.
  goto :EOF
)

echo.
echo ==========================================
echo  Admin panel update complete
echo ==========================================
echo.

ENDLOCAL
exit /b 0

