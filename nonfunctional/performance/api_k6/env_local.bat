@echo off
set API_BOOKER_BAT_URL=https://restful-booker.herokuapp.com
set API_BOOKER_BAT_USERNAME=admin
set API_BOOKER_BAT_PASSWORD=password123
k6 run smoke_test.js
pause

echo URL=%API_BOOKER_BAT_URL%
echo USER=%API_BOOKER_BAT_USERNAME%
echo PASS=%API_BOOKER_BAT_PASSWORD%
