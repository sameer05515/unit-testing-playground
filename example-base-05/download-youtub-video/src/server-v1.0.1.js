const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

const {fileName,saveFolder,videoUrl} = require('./constants')

/**
 * Downloads a YouTube video and saves it to the specified folder.
 * @param {string} videoUrl - The URL of the YouTube video to download.
 * @param {string} saveFolder - The folder where the video will be saved.
 * @param {string} fileName - The name to save the video as (e.g., "video.mp4").
 */
const downloadYouTubeVideo = async (videoUrl, saveFolder, fileName) => {
    if (!videoUrl || !saveFolder || !fileName) {
        console.error('All parameters (videoUrl, saveFolder, fileName) are required.');
        return;
    }

    try {
        // Check if the URL is valid
        const isValid = ytdl.validateURL(videoUrl);
        if (!isValid) {
            console.error('Invalid YouTube URL. Please provide a valid URL.');
            return;
        }

        const filePath = path.join(saveFolder, fileName);

        // Ensure the folder exists
        fs.mkdirSync(saveFolder, { recursive: true });

        console.log('Downloading video...');

        // Stream the video to the file
        const videoStream = ytdl(videoUrl, { quality: 'highestvideo' });
        const writeStream = fs.createWriteStream(filePath);

        videoStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`Video downloaded successfully to ${filePath}`);
        });

        writeStream.on('error', (err) => {
            console.error('Error writing video to file:', err.message);
        });
    } catch (err) {
        console.error('Error downloading video:', err.message);
    }
};

// Usage Example
// const videoUrl = 'https://www.youtube.com/watch?v=your_video_id'; // Replace with the actual YouTube video URL
// const saveFolder = './downloads'; // Replace with the desired folder path
// const fileName = 'video.mp4'; // Replace with the desired file name

downloadYouTubeVideo(videoUrl, saveFolder, fileName);
