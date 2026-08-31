@echo off
REM ==========================================================
REM Master's Key - Windows React Apps Build & Update Script
REM ----------------------------------------------------------
REM - Builds admins / sellers / customers React apps on Windows
REM - Uploads built files to the Linux server via pscp (PuTTY session: fat2)
REM - Runs post-upload commands as deployuser (via plink) to fix perms and reload nginx
REM
REM Requirements:
REM - yarn, node, nx available on PATH
REM - PuTTY installed (pscp.exe / plink.exe in PATH)
REM - Saved PuTTY session (default: fat2) — set PUTTY_SESSION or edit below
REM - /var/www/masterskey/dist/apps/client writable by deployuser (or via sudo)
REM ==========================================================

REM Configure your server PuTTY saved session name here (or set PUTTY_SESSION env var)
if not defined PUTTY_SESSION set "PUTTY_SESSION=saintbala"

SETLOCAL ENABLEDELAYEDEXPANSION

REM Change to repo root (this script lives in deployment-scripts\)
cd /d "%~dp0.."

echo.
echo ==========================================
echo  Master's Key - Build ^& Update React Apps
echo ==========================================
echo.

REM 1) Set GraphQL endpoint for production (frontend)
set VITE_GRAPHQL_ENDPOINT=/graphql
echo Using VITE_GRAPHQL_ENDPOINT=%VITE_GRAPHQL_ENDPOINT%
echo.

REM 2) Install dependencies
echo [1/3] Installing dependencies (yarn install)...
call yarn install
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: yarn install failed.
  goto :ERROR_EXIT
)

REM 3) Build React apps
echo.
echo [2/3] Building React apps...

echo - Building admins...
call yarn nx build kickzone-admins --configuration=production
IF ERRORLEVEL 1 (
  echo ERROR: Build failed for kickzone-admins.
  goto :ERROR_EXIT
)

echo - Building sellers...
call yarn nx build kickzone-sellers --configuration=production
IF ERRORLEVEL 1 (
  echo ERROR: Build failed for kickzone-sellers.
  goto :ERROR_EXIT
)

echo - Building customers...
call yarn nx build kickzone-customers --configuration=production
IF ERRORLEVEL 1 (
  echo ERROR: Build failed for kickzone-customers.
  goto :ERROR_EXIT
)

REM 4) Verify outputs
IF NOT EXIST "dist\apps\client\admins" (
  echo ERROR: dist\apps\client\admins not found.
  goto :ERROR_EXIT
)
IF NOT EXIST "dist\apps\client\sellers" (
  echo ERROR: dist\apps\client\sellers not found.
  goto :ERROR_EXIT
)
IF NOT EXIST "dist\apps\client\customers" (
  echo ERROR: dist\apps\client\customers not found.
  goto :ERROR_EXIT
)

REM 5) Upload to server via pscp (PuTTY saved session)
echo.
echo [3/3] Testing PuTTY session "%PUTTY_SESSION%"...
plink -batch -load %PUTTY_SESSION% "echo connected" >nul 2>&1
IF ERRORLEVEL 1 (
  echo.
  echo ERROR: Cannot connect with PuTTY session "%PUTTY_SESSION%".
  echo Open PuTTY, load that session, connect once, accept the host key, Save, then retry.
  goto :ERROR_EXIT
)

echo [3/3] Uploading builds to server via pscp (session: %PUTTY_SESSION%)...
echo   pscp -batch -load %PUTTY_SESSION% -r dist\apps\client\* :/var/www/masterskey/dist/apps/client/
pscp -batch -load %PUTTY_SESSION% -r dist\apps\client\* :/var/www/masterskey/dist/apps/client/
IF ERRORLEVEL 1 (
  echo ERROR: pscp upload failed.
  goto :ERROR_EXIT
)

REM 6) Post-upload server steps (permissions + nginx reload) as deployuser
echo.
echo Running post-upload commands via plink (session: %PUTTY_SESSION%)...
plink -batch -load %PUTTY_SESSION% ^
  "sudo chown -R www-data:www-data /var/www/masterskey && sudo chmod -R 755 /var/www/masterskey && sudo nginx -t && sudo systemctl reload nginx"
IF ERRORLEVEL 1 (
  echo ERROR: Remote post-upload steps failed.
  goto :ERROR_EXIT
)

echo.
echo ==========================================
echo  Frontend update complete
echo ==========================================
echo.
echo Builds uploaded: admins, sellers, customers
echo nginx reloaded after config test
echo.
echo Press any key to close this window...
pause >nul

ENDLOCAL
exit /b 0

:ERROR_EXIT
echo.
echo ==========================================
echo  Update failed
echo ==========================================
echo.
echo Check the error above. Press any key to close this window...
pause >nul
ENDLOCAL
exit /b 1

