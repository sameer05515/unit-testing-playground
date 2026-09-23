# CBR / CBZ → PDF Converter — v2

Fixed the `extract_archive() missing 1 required positional argument: 'seven_zip'`
error from v1.

Default input:

D:\comics\hawaldar bahadur

Default output:

D:\comics\hawaldar bahadur\pdf

## Run

```powershell
py -m pip install -r requirements.txt
py convert_comics.py
```

Existing PDFs are skipped by default.

To regenerate existing PDFs:

```powershell
py convert_comics.py --overwrite
```

CBR extraction requires 7-Zip.
