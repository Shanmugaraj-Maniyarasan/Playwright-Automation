@echo off
echo Starting Allure report server...
echo Report will open at: http://localhost:9400
cd /d "%~dp0"
npx allure open allure-report --port 9400
pause
