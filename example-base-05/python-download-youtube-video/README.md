# Python YouTube Video Downloader

This folder contains a few lightweight scripts that wrap [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) to download YouTube videos for offline use. They can fetch a single video from the command line or download a curated batch defined in the code.

## Requirements

- Python 3.9+
- `yt-dlp`
- (Optional) `ffmpeg` on your `PATH` for best audio/video muxing results

Install dependencies directly:

```bash
pip install yt-dlp
```

Or inside an isolated environment:

```bash
python -m venv .venv
.venv\Scripts\activate      # Windows PowerShell
pip install --upgrade pip
pip install yt-dlp
```

## Scripts

- `download_video.py` – CLI utility that downloads a single video based on arguments.
- `download_video_v2.py` – Batch download example for a pre-defined playlist (Ram bhajans). Currently scripted to trigger only the last entry.
- `download_video_v3.py` – Batch download example for a different playlist (Mahashivratri collection). Also scripted to trigger only the last entry.

All scripts share the same `download_video()` helper.

## Usage

### Download one video from the command line

```bash
python download_video.py "<video_url>" "<output_directory>" "<file_name>.mp4"
```

- `video_url` – Full YouTube URL.
- `output_directory` – Destination folder (created if missing).
- `file_name` – Target file name. Add an extension (e.g. `.mp4`) that matches the format you expect `yt-dlp` to produce.

Example:

```bash
python download_video.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ" "D:\Downloads\videos" "rick-roll.mp4"
```

### Download a pre-defined batch

Both `download_video_v2.py` and `download_video_v3.py` keep a `videos` list and a `save_to` path.

1. Update `save_to` so it points to a folder you control.
2. Add, remove, or edit entries in the `videos` list (`video_url` + `file_name`).
3. Replace the "download last video only" section with a loop if you want everything:

```python
for video in videos:
    download_video(video["video_url"], save_to, video["file_name"])
```

4. Run the script:

```bash
python download_video_v2.py
```

### Changing output format

By default the scripts pass `format: "best"` to `yt-dlp`. To request a specific combination (e.g. best video ≤1080p plus best audio), tweak the `options` dictionary:

```python
options = {
    "outtmpl": output_path,
    "format": "bestvideo[height<=1080]+bestaudio/best"
}
```

Consult the [`yt-dlp` format selection docs](https://github.com/yt-dlp/yt-dlp#format-selection) for more patterns.

## Troubleshooting

- **`ModuleNotFoundError: No module named 'yt_dlp'`** – Install the package in the environment you are using (`pip install yt-dlp`).
- **Download fails with codec/mux errors** – Ensure `ffmpeg` is installed and available on your `PATH`.
- **Access denied writing files** – Verify that `save_to` points to a folder you can create/update or run the shell with appropriate permissions.

## Legal Reminder

Downloading content may violate YouTube’s Terms of Service or local law. Only download videos when you have the rights or permission to do so.

