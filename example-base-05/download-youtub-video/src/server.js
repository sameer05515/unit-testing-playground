const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Downloads a video from a given URL and saves it to the specified folder.
 * @param {string} videoUrl - The URL of the video to download.
 * @param {string} saveFolder - The folder where the video will be saved.
 * @param {string} fileName - The name to save the video as (e.g., "video.mp4").
 */
const downloadVideo = (videoUrl, saveFolder, fileName) => {
    if (!videoUrl || !saveFolder || !fileName) {
        console.error('All parameters (videoUrl, saveFolder, fileName) are required.');
        return;
    }

    const filePath = path.join(saveFolder, fileName);

    // Ensure the folder exists
    fs.mkdir(saveFolder, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err.message);
            return;
        }

        const file = fs.createWriteStream(filePath);

        https.get(videoUrl, (response) => {
            if (response.statusCode !== 200) {
                console.error(`Failed to download video. Status code: ${response.statusCode}`);
                file.close();
                fs.unlink(filePath, () => {}); // Cleanup partial file
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Video downloaded successfully to ${filePath}`);
            });
        }).on('error', (err) => {
            console.error('Error downloading video:', err.message);
            file.close();
            fs.unlink(filePath, () => {}); // Cleanup partial file
        });
    });
};

// Usage Example
const videoUrl = 'https://www.youtube.com/watch?v=k89wJrChkAA'; // Replace with the actual video URL
const saveFolder = './downloads'; // Replace with the desired folder path
const fileName = 'video.mp4'; // Replace with the desired file name

downloadVideo(videoUrl, saveFolder, fileName);
