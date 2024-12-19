import json
from downloader.video_downloader import download_video
from config.settings import SAVE_TO

# Load video data from JSON
with open("videos.json", "r", encoding="utf-8") as file:
    videos = json.load(file)

if __name__ == '__main__':
    last_video = videos[-1]
    download_video(last_video["video_url"], SAVE_TO, last_video["file_name"])
