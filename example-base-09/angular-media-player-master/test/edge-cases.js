/**
 * Tests for edge cases and error handling
 */
describe('browser tests: edge cases', function () {
  beforeEach(module('mediaPlayer'));
  
  afterEach(function () {
    var audioTags = document.querySelectorAll('audio');
    Array.prototype.forEach.call(audioTags, function (audioTag) {
      angular.element(audioTag).remove();
    });
  });

  it('should handle empty playlist gracefully', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      expect($rootScope.testplayer.tracks).to.equal(0);
      expect($rootScope.testplayer.currentTrack).to.equal(0);
      expect($rootScope.testplayer.$playlist).to.be.an('array');
      expect($rootScope.testplayer.$playlist.length).to.equal(0);
      done();
    });
  });

  it('should handle play() with empty playlist', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      // Should not throw error
      expect(function () {
        $rootScope.testplayer.play();
      }).to.not.throw();
      
      done();
    });
  });

  it('should handle invalid playlist index in play()', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      // Should not throw error with invalid index
      expect(function () {
        $rootScope.testplayer.play(999);
      }).to.not.throw();
      
      done();
    });
  });

  it('should handle next() when at end of playlist', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          $rootScope.testplayer.play();
          
          $rootScope.testplayer.one('playing', function () {
            setTimeout(function () {
              var currentTrack = $rootScope.testplayer.currentTrack;
              $rootScope.testplayer.next();
              
              setTimeout(function () {
                // Should not change track
                expect($rootScope.testplayer.currentTrack).to.equal(currentTrack);
                done();
              }, 50);
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should handle prev() when at beginning of playlist', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          var currentTrack = $rootScope.testplayer.currentTrack;
          $rootScope.testplayer.prev();
          
          setTimeout(function () {
            // Should not change track
            expect($rootScope.testplayer.currentTrack).to.equal(currentTrack);
            done();
          }, 50);
        }, 10);
      });
    });
  });

  it('should reset player correctly', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          expect($rootScope.testplayer.currentTrack).to.be.above(0);
          
          $rootScope.testplayer.reset();
          
          setTimeout(function () {
            expect($rootScope.testplayer.currentTrack).to.equal(0);
            expect($rootScope.testplayer.playing).to.equal(false);
            expect($rootScope.testplayer.ended).to.be.undefined;
            done();
          }, 50);
        }, 10);
      });
    });
  });

  it('should handle playlist removal of current track', function (done) {
    inject(function ($compile, $rootScope) {
      $rootScope.testplaylist = [
        { src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', type: 'audio/ogg' },
        { src: 'http://upload.wikimedia.org/wikipedia/en/c/cb/Stairway_to_Heaven_3_sections.ogg', type: 'audio/ogg' }
      ];
      var element = $compile('<audio media-player="testplayer" playlist="testplaylist"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          $rootScope.testplayer.play(0);
          
          $rootScope.testplayer.one('playing', function () {
            setTimeout(function () {
              // Remove current track
              $rootScope.testplaylist.splice(0, 1);
              $rootScope.$digest();
              
              setTimeout(function () {
                expect($rootScope.testplayer.playing).to.equal(false);
                expect($rootScope.testplayer.tracks).to.equal(1);
                done();
              }, 100);
            }, 10);
          });
        }, 10);
      });
    });
  });

  it('should handle seek with invalid time string', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          // Should not throw error with invalid time string
          expect(function () {
            $rootScope.testplayer.seek('invalid:time:format');
          }).to.not.throw();
          
          done();
        }, 10);
      });
    });
  });

  it('should handle load() without parameters', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      });
      
      $rootScope.testplayer.one('loadedmetadata', function () {
        setTimeout(function () {
          // Should not throw error
          expect(function () {
            $rootScope.testplayer.load();
          }).to.not.throw();
          
          done();
        }, 10);
      });
    });
  });
});
