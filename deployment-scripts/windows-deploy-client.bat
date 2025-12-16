@echo off
REM ==========================================================
REM Master's Key - Windows React Apps Build & Deploy Script
REM ----------------------------------------------------------
REM - Builds admins / sellers / customers React apps on Windows
REM - Uploads built files to the Linux server via pscp
REM - Uses PuTTY session name: fat2
REM
REM Requirements:
REM - yarn, node, nx available on PATH
REM - PuTTY installed (pscp.exe in PATH)
REM - Saved PuTTY session named "fat2" that connects to the server
REM - /var/www/masterskey/dist/apps/client on the server is writable
REM   by the user behind the "fat2" session (often root)
REM ==========================================================

SETLOCAL ENABLEDELAYEDEXPANSION

REM Change to repo root (this script lives in deployment-scripts\)
cd /d "%~dp0.."

echo.
echo ==========================================
echo  Master's Key - Build ^& Deploy React Apps
echo ==========================================
echo.

REM 1) Set GraphQL endpoint for production (frontend)
REM    This is read at build time by Vite (VITE_ prefix required)
set VITE_GRAPHQL_ENDPOINT=/graphql
echo Using VITE_GRAPHQL_ENDPOINT=%VITE_GRAPHQL_ENDPOINT%
echo.

REM 2) Install dependencies (if not already installed)
echo [1/3] Installing dependencies (yarn install)...
call yarn install
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: yarn install failed.
  echo Fix the error above, then re-run this script.
  goto :EOF
)

REM 3) Build React apps
echo.
echo [2/3] Building React apps...

echo - Building admins...
call yarn nx build kickzone-admins --configuration=production
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: Build failed for kickzone-admins.
  goto :EOF
)

echo - Building sellers...
call yarn nx build kickzone-sellers --configuration=production
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: Build failed for kickzone-sellers.
  goto :EOF
)

echo - Building customers...
call yarn nx build kickzone-customers --configuration=production
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: Build failed for kickzone-customers.
  goto :EOF
)

echo.
echo Builds completed. Verifying output...
IF NOT EXIST "dist\apps\client\admins" (
  echo ERROR: dist\apps\client\admins not found.
  goto :EOF
)
IF NOT EXIST "dist\apps\client\sellers" (
  echo ERROR: dist\apps\client\sellers not found.
  goto :EOF
)
IF NOT EXIST "dist\apps\client\customers" (
  echo ERROR: dist\apps\client\customers not found.
  goto :EOF
)

REM 4) Upload to server via pscp (PuTTY session: fat2)
echo.
echo [3/3] Uploading builds to server via pscp (session: fat2)...
echo Command:
echo   pscp -r dist\apps\client\* fat2:/var/www/masterskey/dist/apps/client/
echo.

pscp -r dist\apps\client\* fat2:/var/www/masterskey/dist/apps/client/
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: pscp upload failed.
  echo - Make sure PuTTY session "fat2" exists and connects.
  echo - Make sure the user behind "fat2" has write permission to:
  echo     /var/www/masterskey/dist/apps/client
  goto :EOF
)

echo.
echo ==========================================
echo  Deploy complete (frontend files uploaded)
echo ==========================================
echo.
echo Next steps on the server:
echo   1. ssh fat2   (or ssh deployuser@eng20)
echo   2. sudo chown -R www-data:www-data /var/www/masterskey
echo   3. sudo chmod -R 755 /var/www/masterskey
echo   4. sudo nginx -t
echo   5. sudo systemctl reload nginx
echo.

ENDLOCAL
exit /b 0


