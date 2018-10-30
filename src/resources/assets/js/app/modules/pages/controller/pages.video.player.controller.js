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
                video.html = '<video autoplay id="'+ video.playerId +'" class="'+ (video.playerClass ? video.playerClass : 'video_player')  + '" muted><source src="'+ video.source +'" type="video/mp4"></video>'

                // Bind the player
                $timeout(function(){
                    video.player = document.getElementById(video.playerId);
                    video.playerActions();
                },150);

          };

          video.playerActions = function()
          {
              if (video.player === null)
                   {
                   return;
                   }
              video.player.onended = function() {
              if (video.loop === true || video.loop === 'true')
                     {
                     video.player.currentTime = (video.loopStart !== undefined ? video.loopStart : 0);
                     video.player.play();
                     }
              };
          };

          // Watchers
          $scope.$watch('video.settings', function(newValue,oldValue){
            
            if (angular.isUndefined(newValue) === true)
                 {
                 return;
                 }

            // Only source change should trigger reset.
            if (newValue.source === oldValue.source)
                 {
                 return;
                 }

            video.html = '';

            $timeout(function(){
                video.source = (newValue.source !== undefined ? newValue.source : '');
                video.loop = (newValue.loop !== undefined && newValue.loop === 'true' ? newValue.loop : false);
                video.loopStart = (newValue.loopStart !== undefined ? newValue.loopStart : 0);
                video.$onInit();
            });
          },true);

     }
]);
