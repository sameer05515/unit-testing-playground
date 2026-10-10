import os
from yt_dlp import YoutubeDL
from yt_dlp.utils import DownloadError


def download_video(video_url, save_folder, file_name):
    if not video_url or not save_folder or not file_name:
        print("All parameters (video_url, save_folder, file_name) are required.")
        return False

    os.makedirs(save_folder, exist_ok=True)
    output_path = os.path.join(save_folder, file_name)

    options = {
        "outtmpl": output_path,
        # Prefer a video+audio combination, but fall back to any single-file format.
        # The wildcard allows formats with or without a separate video-only stream.
        "format": "bestvideo*+bestaudio/best",
        "noplaylist": True,
        "retries": 3,
        "fragment_retries": 3,
        "ignoreerrors": False,
    }

    try:
        with YoutubeDL(options) as ydl:
            print(f"Downloading video from {video_url}...")
            ydl.download([video_url])
        print(f"Video downloaded successfully to {output_path}")
        return True
    except DownloadError as exc:
        message = str(exc)
        print(f"Download failed: {message}")
        print(
            "Troubleshooting: update yt-dlp with "
            "'python -m pip install --upgrade yt-dlp'. "
            "If the error mentions merging formats, install FFmpeg and add it to PATH. "
            "You can inspect available formats with "
            f"'yt-dlp --list-formats \"{video_url}\"'."
        )
        return False
    except Exception as exc:
        print(f"Unexpected error while downloading video: {exc}")
        return False
