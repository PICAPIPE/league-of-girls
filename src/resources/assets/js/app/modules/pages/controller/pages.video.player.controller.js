angular.module('pages').controller('PagesVideoPlayerCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var video = this;
          angular.extend(video, $controller('BaseCtrl', {$scope: $scope}));

          video.html     = '';
          video.playerId = '';
          video.player   = null;

          // Init method
          video.$onInit = function()
          {
                video.playerId = (video.id !== undefined ? video.id : 'video_player_') + window.btoa(Math.random(10));
                video.html = '<video autoplay id="'+ video.playerId +'" class="'+ (video.class ? video.class : 'video_player')  + '" muted><source src="'+ video.source +'" type="video/mp4"></video>'

                // Bind the player
                $timeout(function(){
                    video.player = document.getElementById(video.playerId);
                    video.playerActions();
                },50);

          };

          video.playerActions = function()
          {
              video.player.onended = function() {
                if (video.loop === true)
                     {
                     video.player.currentTime = (video.loopStart !== undefined ? video.loopStart : 0);
                     video.player.play();
                     }
              };
          };

          // Watchers
          $scope.$watch('video.settings', function(newValue,oldValue){
            video.html = '';

            // Only source change should trigger reset.
            if (newValue.source === oldValue.source)
                 {
                 return;
                 }
            $timeout(function(){
                video.source = (newValue.source !== undefined ? newValue.source : '');
                video.loop = (newValue.loop !== undefined ? newValue.loop : false);
                video.loopStart = (newValue.loopStart !== undefined ? newValue.loopStart : 0);
                video.$onInit();
            });
          },true);

     }
]);
