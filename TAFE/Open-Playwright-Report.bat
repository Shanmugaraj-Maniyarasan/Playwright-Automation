@echo off
echo Starting Playwright report server...
echo Report will open at: http://localhost:9323
cd /d "%~dp0"
npx playwright show-report --port 9323
pause
