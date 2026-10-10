# Python YouTube Downloader

A small Python command-line project that downloads videos or extracts audio from YouTube URLs using [`yt-dlp`](https://github.com/yt-dlp/yt-dlp).

> **Use responsibly:** Download only content you own, have permission to download, or are otherwise legally allowed to save. Follow YouTube's Terms of Service and applicable copyright laws. This project is not affiliated with YouTube.

## Features

- Download a video using `yt-dlp`.
- Extract audio and convert it to MP3 using FFmpeg.
- Configure download destinations in one place for video downloads.
- Keep video URLs and desired filenames in JSON files.

## Requirements

- Python 3.10 or newer (recommended).
- `yt-dlp`.
- **FFmpeg installed separately** and available on your system `PATH` for audio extraction/conversion. The `ffmpeg` entry in `requirements.txt` is not a substitute for installing the FFmpeg executable.

Check your installation:

```bash
python --version
ffmpeg -version
```

## Setup

Run these commands from the project directory:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

macOS/Linux:

```bash
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If installing dependencies fails because of the `ffmpeg` package listed in `requirements.txt`, install only `yt-dlp` with pip and install the FFmpeg executable using your operating system's package manager or the official FFmpeg website.

## Configuration

### Video downloads

Edit `config/settings.py` and set `SAVE_TO` to a directory on your machine:

```python
SAVE_TO = r"C:\Users\YourName\Downloads\videos"
```

The directory is created automatically when a download starts.

Edit `videos.json` to add or change downloads:

```json
[
  {
    "video_url": "https://www.youtube.com/watch?v=VIDEO_ID",
    "file_name": "example-video.mp4"
  }
]
```

Run:

```bash
python main.py
```

**Current behavior:** `main.py` downloads only the last object in `videos.json` (`videos[-1]`). To download a different item, move it to the end of the list or update the script.

### Audio downloads

Edit the `save_to` directory and the `audios` list in `main_audio.py`, then run:

```bash
python main_audio.py
```

**Current behavior:** `main_audio.py` downloads only the last object in its in-code `audios` list. Audio is extracted as MP3 at the configured 192 kbps quality.

## Project structure

```text
python-youtube-downloader/
├── config/
│   └── settings.py
├── downloader/
│   ├── __init__.py
│   ├── audio_downloader.py
│   └── video_downloader.py
├── audios.json
├── videos.json
├── main.py
├── main_audio.py
├── requirements.txt
├── README.md
└── LICENSE
```

## Troubleshooting

- **`ffmpeg` not found:** Install FFmpeg and ensure its executable is available on `PATH`.
- **`Requested format is not available`:** Update `yt-dlp` (`python -m pip install --upgrade yt-dlp`) and retry. The video downloader uses `bestvideo*+bestaudio/best` to try a video/audio combination and fall back to a single-file format. If no formats are listed, the video may be restricted, unavailable, or require authentication. Inspect formats with `yt-dlp --list-formats "VIDEO_URL"`.
- **Format merging fails:** Install the FFmpeg executable and ensure it is available on `PATH`.
- **Wrong output location:** Check `SAVE_TO` in `config/settings.py` for video downloads and `save_to` in `main_audio.py` for audio downloads.
- **Unexpected filename or extension:** `yt-dlp` may select a format/container based on availability. The video downloader currently requests `format: best` and does not force MP4 conversion.

## Review notes

- The original settings and audio script contain machine-specific Windows paths; replace them before running on another computer.
- Both entry-point scripts select only the last list item, rather than processing every item.
- `main.py` opens `videos.json` using a relative path, so run it from the project root.
- For production use, consider validating filenames, iterating over all configured items, and logging failures instead of only printing errors.

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE).
