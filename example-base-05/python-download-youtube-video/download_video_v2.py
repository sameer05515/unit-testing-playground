import os
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

# Directory to save downloaded videos
save_to = "C:\\Users\\preme\\Downloads\\videos"

# List of videos to download
videos = [
    {
        "video_url": "https://www.youtube.com/watch?v=processed1",
        "file_name": "Processed-Video-1.mp4"
    },
    {
        "video_url": "https://www.youtube.com/watch?v=processed2",
        "file_name": "Processed-Video-2.mp4"
    },
    {
        "video_url": "https://www.youtube.com/watch?v=mkPAkQo6UC8",
        "file_name": "Powerful-Sawan-Special-Mantra.mp4"
    },
    {
        "video_url":"https://www.youtube.com/watch?v=081bLdQKX-Q",
        "file_name":"Namami-Shamishan.mp4"
    },
    {
        "video_url":"https://www.youtube.com/watch?v=eDQN9mCBxgM",
        "file_name":"Jai-Shree-Ram-Lyrical--Ram-Setu.mp4"
    },
    {
        "video_url":"https://www.youtube.com/watch?v=wncNcu6jEgs",
        "file_name":"Raam-Aayenge.mp4"
    },
    {
        "video_url":"https://www.youtube.com/watch?v=pu5RPIYU8nU",
        "file_name":"Nagri-Ho-Ayodhya-Si.mp4"
    },
    {
        "video_url":"https://www.youtube.com/watch?v=M3etmn7Lpno",
        "file_name":"Ram-Aayenge-To-Angana-Sajaungi.mp4"
    },
    {
        "video_url":"https://www.youtube.com/watch?v=JaC2crfwXK8",
        "file_name":"Sampurn-SunderKand.mp4"
    }
]

if __name__ == '__main__':
    # Access the last video in the list
    last_video = videos[-1]
    video_url = last_video["video_url"]
    file_name = last_video["file_name"]

    # Download the last video
    download_video(video_url, save_to, file_name)
