/**
 * Tests for player properties
 */
describe('browser tests: properties', function () {
  beforeEach(module('mediaPlayer'));
  
  afterEach(function () {
    var audioTags = document.querySelectorAll('audio');
    Array.prototype.forEach.call(audioTags, function (audioTag) {
      angular.element(audioTag).remove();
    });
  });

  it('should update formatDuration when metadata is loaded', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.formatDuration).to.be.a('string');
          expect($rootScope.testplayer.formatDuration).to.match(/^\d{2}:\d{2}$/);
          expect($rootScope.testplayer.duration).to.be.above(0);
          done();
        }, 10);
      });
    });
  });

  it('should update formatTime during playback', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('playing', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.formatTime).to.be.a('string');
          expect($rootScope.testplayer.formatTime).to.match(/^\d{2}:\d{2}$/);
          expect($rootScope.testplayer.currentTime).to.be.a('number');
          done();
        }, 100);
      });
    });
  });

  it('should update loadPercent during buffering', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('progress', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.loadPercent).to.be.a('number');
          expect($rootScope.testplayer.loadPercent).to.be.at.least(0);
          expect($rootScope.testplayer.loadPercent).to.be.at.most(100);
          done();
        }, 10);
      });
    });
  });

  it('should update network property to progress', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('progress', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.network).to.equal('progress');
          done();
        }, 10);
      });
    });
  });

  it('should update network property to stalled', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('stalled', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.network).to.equal('stalled');
          done();
        }, 10);
      });
    });
  });

  it('should update network property to suspend', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('suspend', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.network).to.equal('suspend');
          done();
        }, 10);
      });
    });
  });

  it('should track currentTrack correctly', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' },
        { src: 'http://upload.wikimedia.org/wikipedia/en/c/cb/Stairway_to_Heaven_3_sections.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.currentTrack).to.equal(1);
          expect($rootScope.testplayer.tracks).to.equal(2);
          done();
        }, 10);
      });
    });
  });

  it('should update playing property correctly', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      expect($rootScope.testplayer.playing).to.equal(false);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('playing', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.playing).to.equal(true);
          
          $rootScope.testplayer.pause();
          $rootScope.testplayer.one('pause', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.playing).to.equal(false);
              done();
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should update ended property when track finishes', function (done) {
    this.timeout(10000);
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('ended', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.ended).to.equal(true);
          expect($rootScope.testplayer.playing).to.equal(false);
          done();
        }, 10);
      });
    });
  });
});
