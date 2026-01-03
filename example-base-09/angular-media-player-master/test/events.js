/**
 * Tests for event handling functionality
 */
describe('browser tests: event handling', function () {
  beforeEach(module('mediaPlayer'));
  
  afterEach(function () {
    var audioTags = document.querySelectorAll('audio');
    Array.prototype.forEach.call(audioTags, function (audioTag) {
      angular.element(audioTag).remove();
    });
  });

  it('should bind event listener using on() method', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      var eventFired = false;
      $rootScope.testplayer.on('play', function () {
        eventFired = true;
      });
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('playing', function () {
        setTimeout(function () {
          expect(eventFired).to.equal(true);
          done();
        }, 10);
      });
    });
  });

  it('should unbind event listener using off() method', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      var eventCount = 0;
      var handler = function () {
        eventCount++;
      };
      
      $rootScope.testplayer.on('play', handler);
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('playing', function () {
        setTimeout(function () {
          expect(eventCount).to.be.above(0);
          
          // Unbind and play again
          $rootScope.testplayer.off('play', handler);
          $rootScope.testplayer.pause();
          
          setTimeout(function () {
            var countBefore = eventCount;
            $rootScope.testplayer.play();
            
            setTimeout(function () {
              expect(eventCount).to.equal(countBefore);
              done();
            }, 50);
          }, 50);
        }, 10);
      });
    });
  });

  it('should bind one-time event listener using one() method', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      var eventCount = 0;
      $rootScope.testplayer.one('play', function () {
        eventCount++;
      });
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('playing', function () {
        setTimeout(function () {
          expect(eventCount).to.equal(1);
          
          // Play again - should not fire
          $rootScope.testplayer.pause();
          setTimeout(function () {
            $rootScope.testplayer.play();
            
            setTimeout(function () {
              expect(eventCount).to.equal(1);
              done();
            }, 50);
          }, 50);
        }, 10);
      });
    });
  });

  it('should handle multiple event types', function (done) {
    inject(function ($compile, $rootScope) {
      var element = $compile('<audio media-player="testplayer"></audio>')($rootScope);
      angular.element(document.body).append(element);
      
      var eventsFired = {
        play: false,
        pause: false,
        ended: false
      };
      
      $rootScope.testplayer.on('play', function () {
        eventsFired.play = true;
      });
      
      $rootScope.testplayer.on('pause', function () {
        eventsFired.pause = true;
      });
      
      $rootScope.testplayer.load({ 
        src: 'http://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg', 
        type: 'audio/ogg' 
      }, true);
      
      $rootScope.testplayer.one('playing', function () {
        setTimeout(function () {
          expect(eventsFired.play).to.equal(true);
          
          $rootScope.testplayer.pause();
          $rootScope.testplayer.one('pause', function () {
            setTimeout(function () {
              expect(eventsFired.pause).to.equal(true);
              done();
            }, 10);
          });
        }, 10);
      });
    });
  });
});
