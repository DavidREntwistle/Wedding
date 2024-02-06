@echo off

rem Get current date and time in YYYYMMDD_HHMMSS format
set TIMESTAMP=%DATE:/=_%_%TIME::=%
set TIMESTAMP=%TIMESTAMP: =0%
set TIMESTAMP=%TIMESTAMP:~0,19%

rem Display README
echo Please make sure you have Node.js installed. You can download the latest version from https://nodejs.org/

rem Run the JavaScript file and redirect console output to a log file
node testCountdown.js > testCountdown_%TIMESTAMP%.txt

rem Display the contents of the log file
echo Test complete, see log file testCountdown_%TIMESTAMP%.txt
type testCountdown_%TIMESTAMP%.txt

rem Pause to keep the command prompt window open
pause
