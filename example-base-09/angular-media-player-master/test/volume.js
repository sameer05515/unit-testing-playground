/**
 * Tests for volume control functionality
 */
describe('browser tests: volume control', function () {
  beforeEach(module('mediaPlayer'));
  
  afterEach(function () {
    var audioTags = document.querySelectorAll('audio');
    Array.prototype.forEach.call(audioTags, function (audioTag) {
      angular.element(audioTag).remove();
    });
  });

  it('should set volume correctly using setVolume', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      expect($rootScope.testplayer).to.be.an('object');
      
      $rootScope.testplayer.setVolume(0.5);
      $rootScope.testplayer.one('volumechange', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.volume).to.equal(0.5);
          expect($rootScope.testplayer.$domEl.volume).to.equal(0.5);
          done();
        }, 10);
      });
    });
  });

  it('should clamp volume to 0.0 when set below minimum', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.setVolume(-0.1);
      $rootScope.testplayer.one('volumechange', function () {
        setTimeout(function () {
          // Browser will clamp to 0.0
          expect($rootScope.testplayer.$domEl.volume).to.be.at.least(0.0);
          done();
        }, 10);
      });
    });
  });

  it('should clamp volume to 1.0 when set above maximum', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.setVolume(1.5);
      $rootScope.testplayer.one('volumechange', function () {
        setTimeout(function () {
          // Browser will clamp to 1.0
          expect($rootScope.testplayer.$domEl.volume).to.be.at.most(1.0);
          done();
        }, 10);
      });
    });
  });

  it('should toggle mute correctly', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      var initialMuted = $rootScope.testplayer.muted;
      $rootScope.testplayer.toggleMute();
      
      $rootScope.testplayer.one('volumechange', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.muted).to.equal(!initialMuted);
          expect($rootScope.testplayer.$domEl.muted).to.equal(!initialMuted);
          
          // Toggle back
          $rootScope.testplayer.toggleMute();
          $rootScope.testplayer.one('volumechange', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.muted).to.equal(initialMuted);
              done();
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should maintain volume when toggling mute', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.setVolume(0.7);
      $rootScope.testplayer.one('volumechange', function () {
        setTimeout(function () {
          var volumeBeforeMute = $rootScope.testplayer.volume;
          $rootScope.testplayer.toggleMute();
          
          $rootScope.testplayer.one('volumechange', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.volume).to.equal(volumeBeforeMute);
              expect($rootScope.testplayer.muted).to.equal(true);
              done();
            }, 10);
          });
        }, 10);
      });
    });
  });
});
