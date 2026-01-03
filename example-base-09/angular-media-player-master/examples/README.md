# Angular Media Player Examples

This folder contains working examples demonstrating various features of the angular-media-player library.

## Examples

### 01-basic-audio.html
A simple audio player with basic play/pause/stop controls. Perfect for getting started.

**Features:**
- Basic playback controls
- Status display
- Time and duration display
- Loading progress

### 02-playlist.html
Demonstrates playlist functionality with multiple tracks.

**Features:**
- Playlist management
- Next/Previous navigation
- Track selection from playlist
- Current track highlighting

### 03-video-player.html
Shows how to use the player with video elements.

**Features:**
- Video playback
- Seek bar
- Volume control
- Mute toggle

### 04-complete-player.html
A comprehensive example with all available features.

**Features:**
- All playback controls
- Volume and mute
- Playback speed control
- Seek bar with time display
- Quick seek buttons
- Status panel
- Full playlist support

### 05-events-handling.html
Demonstrates event handling and logging.

**Features:**
- Event listeners for all media events
- Real-time event logging
- Event filtering and display
- One-time event examples

### 06-dynamic-playlist.html
Shows how to dynamically modify playlists at runtime.

**Features:**
- Add tracks dynamically
- Remove tracks from playlist
- Clear playlist
- Load sample playlists
- Real-time playlist updates

## Running the Examples

### Option 1: Direct File Opening
Simply open any HTML file in a modern web browser. Note that some browsers may block loading external resources due to CORS policies.

### Option 2: Using a Local Server (Recommended)

#### Using Python
```bash
# Python 2
python -m SimpleHTTPServer 8000

# Python 3
python -m http.server 8000
```

#### Using Node.js (http-server)
```bash
npm install -g http-server
http-server -p 8000
```

#### Using PHP
```bash
php -S localhost:8000
```

Then navigate to: `http://localhost:8000/examples/01-basic-audio.html`

### Option 3: Using the Project's Grunt Server
If you have the project dependencies installed:

```bash
npm install
bower install
grunt docs
```

Then access examples through the documentation server.

## File Structure

Each example is a standalone HTML file that includes:
- AngularJS (via CDN)
- The angular-media-player source files (helpers.js and directive.js)
- Example-specific HTML, CSS, and JavaScript

## Media Files

The examples use publicly available media files from Wikimedia Commons:
- Audio files in OGG format
- Video files in WebM format

**Note:** For production use, replace these with your own media files or ensure proper CORS headers are set.

## Browser Compatibility

These examples work in all modern browsers that support:
- HTML5 Audio/Video
- AngularJS 1.2.x
- ES5 JavaScript

Tested browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

Each example can be customized by:
1. Modifying the CSS styles
2. Changing the playlist data
3. Adding/removing controls
4. Implementing custom event handlers

## Troubleshooting

### Media files not loading
- Check browser console for CORS errors
- Ensure media URLs are accessible
- Try using local media files instead

### Player not initializing
- Verify AngularJS is loaded
- Check that helpers.js loads before directive.js
- Ensure the `mediaPlayer` module is included in your app

### Events not firing
- Check browser console for errors
- Verify event listeners are set up after player initialization
- Use `$scope.$watch` to detect when player is ready

## Next Steps

After exploring these examples:
1. Read the [USAGE.md](../USAGE.md) for detailed API documentation
2. Check [TEST_COVERAGE.md](../TEST_COVERAGE.md) to understand test coverage
3. Review the source code in `src/` directory
4. Create your own custom player implementation

## Contributing

If you create a useful example, consider:
1. Following the existing example structure
2. Adding comments for clarity
3. Including error handling
4. Testing in multiple browsers
5. Documenting any special requirements
