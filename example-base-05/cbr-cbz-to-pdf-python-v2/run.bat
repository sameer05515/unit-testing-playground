@echo off
cd /d "%~dp0"
py -m pip install -r requirements.txt
py convert_comics.py "D:\comics\hawaldar bahadur"
pause
