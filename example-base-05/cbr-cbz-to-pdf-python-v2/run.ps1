$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

py -m pip install -r requirements.txt

py convert_comics.py "D:\comics\hawaldar bahadur"

Read-Host "Press Enter to close"
