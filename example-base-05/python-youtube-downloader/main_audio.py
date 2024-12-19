from downloader.audio_downloader import download_audio

# Directory to save audio files
save_to = "C:\\Users\\preme\\Downloads\\audios"

# List of audio downloads
audios = [
    {
        "video_url": "https://www.youtube.com/watch?v=VFCHtKhihrM",
        "file_name": "26Feb2025-namo-namo-mahadev.mp3"
    },
  {
    "video_url":"https://www.youtube.com/watch?v=0X4aZqBGySQ",
    "file_name":"Sher-Pe-Sawar-Hoke-Aaja-Sherawaliye.mp3"
  }
]

if __name__ == '__main__':
    last_audio = audios[-1]
    download_audio(last_audio["video_url"], save_to, last_audio["file_name"])
