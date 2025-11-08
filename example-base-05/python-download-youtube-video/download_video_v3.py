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
     "video_url":"https://www.youtube.com/watch?v=VFCHtKhihrM",
        "file_name":"26Feb2025.namo-namo-mahadev---bhakti-songs---maha-shivratri.mp4"   
    },
    {
        "file_name":"महाशिवरात्रि-special-भजन ---Top-Shivratri-Bhajans.mp4",
        "video_url":"https://www.youtube.com/watch?v=Cz9dlGGL3JM"
    },
    {
        "file_name":"26Feb2025.non-stop-shiv-bhajan---mahadev-songs.mp4",
        "video_url":"https://www.youtube.com/watch?v=GZ1RRhMs9do"
    },
    {
        "file_name":"26Feb2025.maha-mrityunjay-mantra---108-times.mp4",
        "video_url":"https://www.youtube.com/watch?v=4N-pLRpGo30"
    },
    {
        "file_name":"26Feb2025.mahakal-ki-mahima---ravindra-jain.mp4",
        "video_url":"https://www.youtube.com/watch?v=DZcvJ3XK7Fs"
    },
    {
        "file_name":"26Feb2025.shiv-vivah-prasang---ravindra-jain.mp4",
        "video_url":"https://www.youtube.com/watch?v=m0EALo8Y1Z0"
    },
    {
        "file_name":"26Feb2025.top-10-shiv-bhajans--ravindra-jain--suresh-wadkar--sadhna-sargam--shankar-mahadevan.mp4",
        "video_url":"https://www.youtube.com/watch?v=yQonW6-A_Z8"
    },
    {
        "file_name":"26Feb2025.shiv-vivah-by--suresh-wadkar--anuradha-paudwal.mp4",
        "video_url":"https://www.youtube.com/watch?v=faGCIuIviEI"
    },
    {
        "file_name":"26Feb2025.shiv-vivah---by---narendra-chanchal---bum-bhola-mahadev-prabhu-shiv-shankar-mahadev.mp4",
        "video_url":"https://www.youtube.com/watch?v=KTu5rmWtM7Q"
    }
]

if __name__ == '__main__':
    # Access the last video in the list
    last_video = videos[-1]
    video_url = last_video["video_url"]
    file_name = last_video["file_name"]

    # Download the last video
    download_video(video_url, save_to, file_name)
