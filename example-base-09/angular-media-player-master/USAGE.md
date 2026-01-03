# Angular Media Player - Usage Guide

## Table of Contents
1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Basic Usage](#basic-usage)
4. [Advanced Features](#advanced-features)
5. [API Reference](#api-reference)
6. [Examples](#examples)
7. [Troubleshooting](#troubleshooting)

## Installation

### Using Bower
```bash
bower install angular-media-player
```

### Using npm
```bash
npm install angular-media-player
```

### Manual Installation
Download the latest release from GitHub and include the script in your HTML:
```html
<script src="path/to/angular-media-player.js"></script>
```

## Quick Start

### 1. Include AngularJS and angular-media-player
```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
<script src="path/to/angular-media-player.js"></script>
```

### 2. Add the module to your Angular app
```javascript
angular.module('myApp', ['mediaPlayer']);
```

### 3. Use the directive in your HTML
```html
<div ng-controller="MyController">
  <audio media-player="myPlayer">
    <source src="path/to/audio.mp3" type="audio/mpeg">
  </audio>
  
  <button ng-click="myPlayer.playPause()">Play/Pause</button>
  <span>{{ myPlayer.playing ? 'Playing' : 'Paused' }}</span>
</div>
```

## Basic Usage

### Simple Audio Player

```html
<div ng-controller="PlayerController">
  <audio media-player="player">
    <source src="song.mp3" type="audio/mpeg">
  </audio>
  
  <div>
    <button ng-click="player.playPause()">
      <span ng-show="!player.playing">Play</span>
      <span ng-show="player.playing">Pause</span>
    </button>
    <button ng-click="player.stop()">Stop</button>
  </div>
  
  <div>
    <span>{{ player.formatTime }} / {{ player.formatDuration }}</span>
  </div>
</div>
```

### Video Player

```html
<div ng-controller="VideoController">
  <video media-player="videoPlayer" width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
  </video>
  
  <div>
    <button ng-click="videoPlayer.playPause()">Play/Pause</button>
    <input type="range" min="0" max="1" step="0.1" 
           ng-model="videoPlayer.volume" 
           ng-change="videoPlayer.setVolume(videoPlayer.volume)">
  </div>
</div>
```

## Advanced Features

### Playlist Management

#### Basic Playlist
```javascript
angular.module('myApp', ['mediaPlayer'])
.controller('PlaylistController', function($scope) {
  $scope.playlist = [
    { src: 'song1.mp3', type: 'audio/mpeg' },
    { src: 'song2.mp3', type: 'audio/mpeg' },
    { src: 'song3.mp3', type: 'audio/mpeg' }
  ];
});
```

```html
<audio media-player="player" playlist="playlist">
  <source src="song1.mp3" type="audio/mpeg">
</audio>

<button ng-click="player.next()">Next</button>
<button ng-click="player.prev()">Previous</button>
<span>Track {{ player.currentTrack }} of {{ player.tracks }}</span>
```

#### Multiple Source Formats
For better browser compatibility, provide multiple source formats:

```javascript
$scope.playlist = [
  [
    { src: 'song1.ogg', type: 'audio/ogg' },
    { src: 'song1.mp3', type: 'audio/mpeg' }
  ],
  [
    { src: 'song2.ogg', type: 'audio/ogg' },
    { src: 'song2.mp3', type: 'audio/mpeg' }
  ]
];
```

### Volume Control

```html
<div>
  <button ng-click="player.toggleMute()">
    <span ng-show="!player.muted">Mute</span>
    <span ng-show="player.muted">Unmute</span>
  </button>
  
  <input type="range" min="0" max="1" step="0.1" 
         ng-model="volume" 
         ng-change="player.setVolume(volume)">
  <span>{{ (player.volume * 100).toFixed(0) }}%</span>
</div>
```

### Seeking

```html
<div>
  <input type="range" 
         min="0" 
         max="{{ player.duration }}" 
         step="1" 
         ng-model="seekTime"
         ng-change="player.seek(seekTime)">
  
  <!-- Or use time string format -->
  <button ng-click="player.seek('0:30')">Jump to 0:30</button>
  <button ng-click="player.seek('1:15:30')">Jump to 1:15:30</button>
</div>
```

### Playback Rate

```html
<div>
  <label>Playback Speed:</label>
  <select ng-model="playbackRate" ng-change="player.setPlaybackRate(playbackRate)">
    <option value="0.5">0.5x</option>
    <option value="1.0" selected>1.0x</option>
    <option value="1.5">1.5x</option>
    <option value="2.0">2.0x</option>
  </select>
</div>
```

### Event Handling

```javascript
angular.module('myApp', ['mediaPlayer'])
.controller('EventController', function($scope) {
  $scope.$on('$viewContentLoaded', function() {
    // Listen to play event
    $scope.player.on('play', function() {
      console.log('Playback started');
    });
    
    // Listen to pause event
    $scope.player.on('pause', function() {
      console.log('Playback paused');
    });
    
    // Listen to ended event
    $scope.player.on('ended', function() {
      console.log('Track finished');
      // Auto-play next track if available
      if ($scope.player.currentTrack < $scope.player.tracks) {
        $scope.player.next(true);
      }
    });
    
    // One-time event listener
    $scope.player.one('loadedmetadata', function() {
      console.log('Metadata loaded:', $scope.player.duration);
    });
  });
});
```

### Selective Play

Control whether the player automatically advances to the next track:

```javascript
// Play only the selected track, don't auto-advance
$scope.player.play(2, true);  // Play track 3 with selective play

// Play and continue to next track when finished
$scope.player.play(2, false);  // Play track 3, auto-advance enabled
```

### Dynamic Playlist Updates

```javascript
angular.module('myApp', ['mediaPlayer'])
.controller('DynamicController', function($scope) {
  $scope.playlist = [
    { src: 'song1.mp3', type: 'audio/mpeg' },
    { src: 'song2.mp3', type: 'audio/mpeg' }
  ];
  
  // Add a new track
  $scope.addTrack = function(src, type) {
    $scope.playlist.push({ src: src, type: type });
  };
  
  // Remove a track
  $scope.removeTrack = function(index) {
    $scope.playlist.splice(index, 1);
  };
  
  // Replace entire playlist
  $scope.loadNewPlaylist = function(newPlaylist) {
    $scope.playlist = newPlaylist;
  };
});
```

## API Reference

### Methods

#### `player.load([mediaElement], [autoplay])`
Loads a media element or reloads the current one.

**Parameters:**
- `mediaElement` (Object|Array, optional): Media element to load
- `autoplay` (Boolean, optional): Whether to autoplay after loading

**Example:**
```javascript
player.load({ src: 'song.mp3', type: 'audio/mpeg' }, true);
```

#### `player.play([index], [selectivePlay])`
Starts playback or plays a specific track from the playlist.

**Parameters:**
- `index` (Number, optional): 0-based playlist index
- `selectivePlay` (Boolean, optional): If true, only plays the selected track

**Example:**
```javascript
player.play();           // Play current track
player.play(2);          // Play track at index 2
player.play(2, true);    // Play track 2 only, no auto-advance
```

#### `player.playPause([index], [selectivePlay])`
Toggles between play and pause, or plays a specific track.

**Parameters:**
- `index` (Number, optional): 0-based playlist index
- `selectivePlay` (Boolean, optional): If true, only plays the selected track

**Example:**
```javascript
player.playPause();      // Toggle play/pause
player.playPause(1);     // Play track at index 1
```

#### `player.pause()`
Pauses playback.

**Example:**
```javascript
player.pause();
```

#### `player.stop()`
Stops playback and resets the player.

**Example:**
```javascript
player.stop();
```

#### `player.next([autoplay])`
Advances to the next track in the playlist.

**Parameters:**
- `autoplay` (Boolean, optional): Force autoplay

**Example:**
```javascript
player.next();      // Next track, autoplay if currently playing
player.next(true);  // Next track and autoplay
```

#### `player.prev([autoplay])`
Goes to the previous track in the playlist.

**Parameters:**
- `autoplay` (Boolean, optional): Force autoplay

**Example:**
```javascript
player.prev();      // Previous track, autoplay if currently playing
player.prev(true);  // Previous track and autoplay
```

#### `player.toggleMute()`
Toggles the mute state.

**Example:**
```javascript
player.toggleMute();
```

#### `player.setVolume(value)`
Sets the volume level.

**Parameters:**
- `value` (Number): Volume between 0.0 and 1.0

**Example:**
```javascript
player.setVolume(0.5);  // Set to 50%
```

#### `player.setPlaybackRate(value)`
Sets the playback rate.

**Parameters:**
- `value` (Number): Playback rate (e.g., 0.5 for half speed, 2.0 for double speed)

**Example:**
```javascript
player.setPlaybackRate(1.5);  // 1.5x speed
```

#### `player.seek(value)`
Seeks to a specific time position.

**Parameters:**
- `value` (Number|String): Time in seconds or "HH:mm:ss" format

**Example:**
```javascript
player.seek(30);        // Seek to 30 seconds
player.seek('1:30');    // Seek to 1 minute 30 seconds
player.seek('1:15:30'); // Seek to 1 hour 15 minutes 30 seconds
```

#### `player.reset([autoplay])`
Resets the player to initial state.

**Parameters:**
- `autoplay` (Boolean, optional): Whether to autoplay after reset

**Example:**
```javascript
player.reset();
player.reset(true);  // Reset and autoplay
```

#### `player.on(type, fn)`
Binds an event listener.

**Parameters:**
- `type` (String): Event type
- `fn` (Function): Event handler

**Returns:** Unbind function

**Example:**
```javascript
var unbind = player.on('play', function() {
  console.log('Playing');
});
// Later...
unbind();
```

#### `player.off(type, fn)`
Removes an event listener.

**Parameters:**
- `type` (String): Event type
- `fn` (Function): Event handler to remove

**Example:**
```javascript
var handler = function() { console.log('Playing'); };
player.on('play', handler);
player.off('play', handler);
```

#### `player.one(type, fn)`
Binds a one-time event listener.

**Parameters:**
- `type` (String): Event type
- `fn` (Function): Event handler

**Example:**
```javascript
player.one('loadedmetadata', function() {
  console.log('Metadata loaded once');
});
```

### Properties

#### `player.playing`
Boolean indicating if the player is currently playing.

#### `player.ended`
Boolean indicating if playback has ended.

#### `player.network`
String indicating network state: `'progress'`, `'stalled'`, `'suspend'`, or `undefined`.

#### `player.currentTrack`
1-based index of the current track in the playlist.

#### `player.tracks`
Number of tracks in the playlist (0-based count).

#### `player.currentTime`
Current playback position in seconds.

#### `player.duration`
Total duration of the media in seconds.

#### `player.volume`
Volume level (0.0 to 1.0).

#### `player.muted`
Boolean indicating if the player is muted.

#### `player.playbackRate`
Playback rate (1.0 is normal speed).

#### `player.formatDuration`
Formatted duration string (HH:mm:ss).

#### `player.formatTime`
Formatted current time string (HH:mm:ss).

#### `player.loadPercent`
Buffering progress as a percentage (0-100).

#### `player.buffered`
TimeRanges object representing buffered ranges.

#### `player.played`
TimeRanges object representing played ranges.

#### `player.seekable`
TimeRanges object representing seekable ranges.

## Examples

### Complete Audio Player with Controls

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <script src="angular.js"></script>
  <script src="angular-media-player.js"></script>
</head>
<body ng-controller="PlayerController">
  <audio media-player="player" playlist="playlist">
    <source src="song1.mp3" type="audio/mpeg">
  </audio>
  
  <div class="player-controls">
    <button ng-click="player.prev()">⏮</button>
    <button ng-click="player.playPause()">
      <span ng-show="!player.playing">▶</span>
      <span ng-show="player.playing">⏸</span>
    </button>
    <button ng-click="player.next()">⏭</button>
    <button ng-click="player.stop()">⏹</button>
  </div>
  
  <div class="player-info">
    <div>{{ player.formatTime }} / {{ player.formatDuration }}</div>
    <div>Track {{ player.currentTrack }} of {{ player.tracks }}</div>
    <div>Loading: {{ player.loadPercent }}%</div>
  </div>
  
  <div class="volume-control">
    <button ng-click="player.toggleMute()">
      <span ng-show="!player.muted">🔊</span>
      <span ng-show="player.muted">🔇</span>
    </button>
    <input type="range" min="0" max="1" step="0.1" 
           ng-model="player.volume" 
           ng-change="player.setVolume(player.volume)">
  </div>
  
  <div class="playlist">
    <ul>
      <li ng-repeat="track in playlist" 
          ng-class="{active: $index + 1 === player.currentTrack}"
          ng-click="player.play($index)">
        Track {{ $index + 1 }}
      </li>
    </ul>
  </div>
  
  <script>
    angular.module('myApp', ['mediaPlayer'])
    .controller('PlayerController', function($scope) {
      $scope.playlist = [
        { src: 'song1.mp3', type: 'audio/mpeg' },
        { src: 'song2.mp3', type: 'audio/mpeg' },
        { src: 'song3.mp3', type: 'audio/mpeg' }
      ];
    });
  </script>
</body>
</html>
```

### Video Player with Custom Controls

```html
<div ng-controller="VideoController">
  <video media-player="video" width="640" height="360" playlist="videoPlaylist">
    <source src="video1.mp4" type="video/mp4">
  </video>
  
  <div class="video-controls">
    <button ng-click="video.playPause()">Play/Pause</button>
    <input type="range" min="0" max="{{ video.duration }}" 
           ng-model="video.currentTime" 
           ng-change="video.seek(video.currentTime)">
    <span>{{ video.formatTime }} / {{ video.formatDuration }}</span>
  </div>
</div>
```

## Troubleshooting

### Player not initializing
- Ensure `mediaPlayer` module is included in your app dependencies
- Check that the directive is applied to an `<audio>` or `<video>` tag
- Verify the `media-player` attribute is set correctly

### Playlist not working
- Ensure playlist is an array in the scope
- Check that playlist items have `src` and `type` properties
- Verify the `playlist` attribute matches the scope variable name

### Events not firing
- Use `player.on()` instead of `$rootScope.$on()`
- Events are bound to the player scope, not `$rootScope`
- Check browser console for errors

### Volume/Mute not working
- Volume must be between 0.0 and 1.0
- Browser may clamp values automatically
- Check that `volumechange` events are being handled

### Seeking not working
- Ensure media has loaded metadata before seeking
- Use `player.seek()` method, not direct `currentTime` assignment
- Check that media is seekable (not live stream)

### Throttling timeupdate events
By default, `timeupdate` events are throttled to once per second. To customize:

```javascript
angular.module('myApp')
.value('mp.throttleSettings', {
  enabled: true,
  time: 500  // Update every 500ms
});
```

To disable throttling:
```javascript
angular.module('myApp')
.value('mp.throttleSettings', {
  enabled: false,
  time: 1000
});
```

## Browser Compatibility

This library supports all browsers that support HTML5 `<audio>` and `<video>` tags:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE9+ (with limitations - MP3 only for audio)

For IE9-10, ensure you provide MP3 format for audio files.

## License

MIT License - see LICENSE file for details.
