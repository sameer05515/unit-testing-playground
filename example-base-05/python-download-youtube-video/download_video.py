import os
import sys
from yt_dlp import YoutubeDL

def download_video(video_url, save_folder, file_name):
    if not video_url or not save_folder or not file_name:
        print("All parameters (video_url, save_folder, file_name) are required.")
        return

    # Ensure the folder exists
    os.makedirs(save_folder, exist_ok=True)
    output_path = os.path.join(save_folder, file_name)

    options = {
        'outtmpl': output_path,  # Save as specified file name
        'format': 'best'        # Download the best available quality
    }

    try:
        with YoutubeDL(options) as ydl:
            print(f"Downloading video from {video_url}...")
            ydl.download([video_url])
            print(f"Video downloaded successfully to {output_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    # Usage: python download_video.py <video_url> <save_folder> <file_name>
    if len(sys.argv) != 4:
        print("Usage: python download_video.py <video_url> <save_folder> <file_name>")
    else:
        video_url = sys.argv[1]
        save_folder = sys.argv[2]
        file_name = sys.argv[3]
        download_video(video_url, save_folder, file_name)
