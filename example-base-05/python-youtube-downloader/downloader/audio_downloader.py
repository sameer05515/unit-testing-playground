import os
from yt_dlp import YoutubeDL

def download_audio(video_url, save_folder, file_name):
    if not video_url or not save_folder or not file_name:
        print("All parameters (video_url, save_folder, file_name) are required.")
        return

    os.makedirs(save_folder, exist_ok=True)
    output_path = os.path.join(save_folder, file_name)

    options = {
        'format': 'bestaudio/best',  # Download the best available audio
        'outtmpl': output_path,  # Save as the specified file name
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',  # Convert to MP3 format
            'preferredquality': '192',  # Set quality (192kbps)
        }]
    }

    try:
        with YoutubeDL(options) as ydl:
            print(f"Downloading audio from {video_url}...")
            ydl.download([video_url])
            print(f"Audio downloaded successfully to {output_path}")
    except Exception as e:
        print(f"An error occurred: {e}")
