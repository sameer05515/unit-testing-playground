/**
 * Tests for selective play functionality
 */
describe('browser tests: selective play', function () {
  beforeEach(module('mediaPlayer'));
  
  afterEach(function () {
    var audioTags = document.querySelectorAll('audio');
    Array.prototype.forEach.call(audioTags, function (audioTag) {
      angular.element(audioTag).remove();
    });
  });

  it('should play only selected track when selectivePlay is true', function (done) {
    this.timeout(10000);
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' },
        { src: 'http://upload.wikimedia.org/wikipedia/en/c/cb/Stairway_to_Heaven_3_sections.ogg', type: 'audio/ogg' },
        { src: 'http://upload.wikimedia.org/wikipedia/en/d/d0/Beatles_cometogether.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('canplaythrough', function () {
        setTimeout(function () {
          $rootScope.testplayer.play(1, true); // Play track 2 with selective play
          
          $rootScope.testplayer.one('playing', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.currentTrack).to.equal(2);
              
              // Wait for track to end
              $rootScope.testplayer.one('ended', function () {
                setTimeout(function () {
                  // Should not auto-advance to next track
                  expect($rootScope.testplayer.ended).to.equal(true);
                  expect($rootScope.testplayer.currentTrack).to.equal(2);
                  done();
                }, 10);
              });
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should continue to next track when selectivePlay is false', function (done) {
    this.timeout(10000);
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' },
        { src: 'http://upload.wikimedia.org/wikipedia/en/c/cb/Stairway_to_Heaven_3_sections.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('canplaythrough', function () {
        setTimeout(function () {
          $rootScope.testplayer.play(0, false); // Play track 1 without selective play
          
          $rootScope.testplayer.one('playing', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.currentTrack).to.equal(1);
              
              // Wait for track to end - should auto-advance
              $rootScope.testplayer.one('ended', function () {
                setTimeout(function () {
                  // Should have advanced to next track
                  expect($rootScope.testplayer.currentTrack).to.equal(2);
                  done();
                }, 100);
              });
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should toggle selective play with playPause', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' },
        { src: 'http://upload.wikimedia.org/wikipedia/en/c/cb/Stairway_to_Heaven_3_sections.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('canplaythrough', function () {
        setTimeout(function () {
          // Enable selective play
          $rootScope.testplayer.playPause(0, true);
          
          $rootScope.testplayer.one('playing', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.$selective).to.equal(true);
              
              // Disable selective play
              $rootScope.testplayer.playPause(0, false);
              
              setTimeout(function () {
                expect($rootScope.testplayer.$selective).to.equal(false);
                done();
              }, 10);
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should handle selectivePlay with play() method overloading', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('canplaythrough', function () {
        setTimeout(function () {
          // Test method overloading - boolean as first parameter
          $rootScope.testplayer.play(true);
          
          $rootScope.testplayer.one('playing', function () {
            setTimeout(function () {
              expect($rootScope.testplayer.$selective).to.equal(true);
              done();
            }, 10);
          });
        }, 10);
      });
    });
  });
});
