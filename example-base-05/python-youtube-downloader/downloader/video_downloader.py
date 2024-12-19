import os
from yt_dlp import YoutubeDL

def download_video(video_url, save_folder, file_name):
    if not video_url or not save_folder or not file_name:
        print("All parameters (video_url, save_folder, file_name) are required.")
        return

    os.makedirs(save_folder, exist_ok=True)
    output_path = os.path.join(save_folder, file_name)

    # options = {
    #     'outtmpl': output_path,
    #     'format': 'bestvideo+bestaudio/best',  # Ensure best available quality
    #     # 'merge_output_format': 'mp4',
    #     # 'postprocessors': [{'key': 'FFmpegVideoConvertor', 'preferedformat': 'mp4'}]
    # }

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
