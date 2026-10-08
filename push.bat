@echo off
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\mingw64\bin;%PATH%"
"%LOCALAPPDATA%\Programs\Git\cmd\git.exe" push -u origin main
pause
